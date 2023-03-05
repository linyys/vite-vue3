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
let dc: RTCDataChannel
localConnection.onsignalingstatechange = function () {
  console.log("Signaling state: " + localConnection.signalingState)
}
const conn = async (c_uid: string) => {
  const offer = await localConnection.createOffer({})
  await localConnection.setLocalDescription(offer)
  socket.emit("send", { offer, c_uid, uid, state: "c_offer" }, (data: any) => {
    console.log("发送", data)
  })
}

const respond = async (c_uid: any) => {
  const answer = await localConnection.createAnswer({})
  await localConnection.setLocalDescription(answer)
  socket.emit(
    "send",
    { answer, c_uid, uid, state: "c_answer" },
    (data: any) => {
      console.log(data)
    }
  )
}

const join = async () => {
  socket.emit("join", { uid }, (data: any) => {
    console.log("加入")
  })
  socket.on(uid, async (data) => {
    if (data.state == "c_offer") {
      await accept_offer(data)
      await respond(data.uid)
      ready()
    } else if (data.state == "c_answer") {
      await accept_answer(data.answer)
      ready()
    }
  })
  socket.on("joined", (data) => {
    user_list.value.push(data)
  })
}

const ready = () => {
  localConnection.addEventListener("icecandidate", (e) => {
    localConnection.addIceCandidate(e.candidate as any)
  })
  console.log(localConnection)

  dc = localConnection.createDataChannel("chat")
  dc.onopen = () => {
    console.log("已打开")
  }
  dc.onmessage = (e) => {
    console.log(e)
  }
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
