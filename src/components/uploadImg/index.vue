<template>
  <div id="upload" @click="input_file.click()">
    <div>
      <p>{{ title }}</p>
      <p>{{ sumTitle }}</p>
    </div>
    <input
      type="file"
      ref="input_file"
      style="display: none"
      @change="upload"
      accept=".jpg,.png"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue"

const props = defineProps({
  title: {
    type: String,
    default: "上传图片",
    required: false
  },
  sumTitle: {
    type: String,
    default: "upload image",
    required: false
  }
})
const input_file = ref()
const image = ref()
const emits = defineEmits(["uploaded"])
const upload = (e: any) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    file.path = reader.result
    emits("uploaded", file)
  }
}
</script>
<style scoped lang="scss">
#upload {
  border: 1px dotted #c9cdd4;
  background-color: #f2f3f5;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #e5e6eb;
  }
}
</style>
