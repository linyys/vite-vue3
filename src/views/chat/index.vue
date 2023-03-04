<template>
  <div>
    <a-card>
      <a-button @click="join">加入</a-button>
      <a-input v-model="uid" />
      <a-button @click="conn">连接</a-button>
      <a-input v-model="c_uid" />
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import { chat_conn, chat_join } from "@/api/chat"
import { ref } from "vue"

const c_uid = ref("")
const uid = ref("")

const conn = async () => {
  const { data: res } = await chat_conn({ uid: c_uid.value, c_uid: "123" })
  console.log(res)
}
const join = async () => {
  const { data: res } = await chat_join({ uid: uid.value })
  console.log(res)
}
const create_conn = async (config: any) => {
  // 创建本地 RTCPeerConnection 对象
  const localConnection = new RTCPeerConnection({})
  const offer = await localConnection.createOffer({})
  await localConnection.setLocalDescription(offer)
}
</script>
<style scoped></style>
