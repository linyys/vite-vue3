<template>
  <div>
    <a-card>
      <div
        v-for="item in user_list"
        :key="item"
        style="cursor: pointer; margin: 10px 0"
        @click="conn(item)"
      >
        <div v-if="item !== uid">{{ item }}</div>
      </div>
      <a-button @click="onmessage">就绪</a-button>
      <a-button @click="test">检查</a-button>
      <a-input v-model="input" />
      <a-button @click="send">send</a-button>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import { io } from "socket.io-client"
import { Ref } from "vue"

const uid = new Date().getTime().toString()
const user_list: Ref = ref([])
const socket = io("http://127.0.0.1:4000", { autoConnect: false })
const input = ref("")
const localConnection = new RTCPeerConnection({})
localConnection.addEventListener("icecandidate", (e) => {
  // localConnection.addIceCandidate(e.candidate as any)
  console.log(e.candidate)

  if (e.candidate !== null) {
    conn_ice(e.candidate)
  }
})
let dc: RTCDataChannel
let c_uid: string
const conn = async (item: string) => {
  c_uid = item
  const offer = await localConnection.createOffer({})
  await localConnection.setLocalDescription(offer)
  socket.emit("send", { offer, c_uid, uid, state: "c_offer" })
}

const conn_ice = async (candidate: RTCIceCandidate) => {
  let data = JSON.stringify(candidate)
  socket.emit("send", { candidate: data, c_uid, uid, state: "c_candidate" })
}

const accept_ice = async (candidate: string) => {
  let data = JSON.parse(candidate)
  localConnection.addIceCandidate(data)
  console.log(data)
}

const respond = async (c_uid: any) => {
  const answer = await localConnection.createAnswer({})
  await localConnection.setLocalDescription(answer)
  socket.emit("send", { answer, c_uid, uid, state: "c_answer" })
}

const join = async () => {
  socket.emit("join", { uid })
  socket.on(uid, async (data) => {
    if (data.state == "c_offer") {
      console.log("c_offer")
      await accept_offer(data)
      await respond(data.uid)
    } else if (data.state == "c_answer") {
      console.log("c_answer")
      await accept_answer(data.answer)
    } else if (data.state == "c_candidate") {
      console.log("c_candidate")
      await accept_ice(data.candidate)
    }
    ready()
  })
  socket.on("joined", (data) => {
    user_list.value.push(data)
  })
}

const ready = () => {
  console.log(1)

  dc = localConnection.createDataChannel("chat")
  dc.onopen = () => {
    console.log("open", dc.readyState)
  }
  dc.onclose = (e) => {
    console.log("close", e)
  }
  dc.onerror = (e) => {
    console.log("err", e)
  }
}

const onmessage = () => {
  dc.onmessage = (e) => {
    console.log("msg", e)
  }
}

const test = () => {
  console.log(localConnection.iceConnectionState)
  console.log(localConnection.connectionState)
  console.log(localConnection.sctp)
}

const send = () => {
  dc.send(input.value)
}

const accept_offer = async (data: any) => {
  await localConnection.setRemoteDescription(data.offer)
}

const accept_answer = async (answer: any) => {
  await localConnection.setRemoteDescription(answer)
}

onMounted(async () => {
  socket.connect()
  await join()
})
</script>
<style scoped></style>
