<template>
  <a-card>
    <a-descriptions :data="data" title="User Info" bordered />
  </a-card>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from "vue"

const data = reactive([
  {
    label: "ip"
  },
  {
    label: "内核"
  },
  {
    label: "内核版本"
  },
  {
    label: "平台"
  },
  {
    label: "浏览器"
  },
  {
    label: "浏览器版本"
  },
  {
    label: "系统"
  },
  {
    label: "系统版本"
  },
  {
    label: "系统语言"
  },
  {
    label: "网络状态"
  },
  {
    label: "ws连接"
  }
])

const get_browser_info = () => {
  console.log(navigator)
}
onMounted(() => {
  get_browser_info()
})
</script>
<style scoped></style>
