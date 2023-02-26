<template>
  <div>
    <div>
      <uploadImg @uploaded="upload" />
    </div>
    <canvas ref="canvas" id="edit_canvas" />
    <img src="@/assets/lock-bg.jpg" style="display: none" ref="imgs" />
  </div>
</template>
<script lang="ts" setup>
import uploadImg from "@/components/uploadImg/index.vue"
import { onMounted } from "vue"
import { ref } from "vue"
const canvas = ref()
const imgs = ref()
let edit_canvas: CanvasRenderingContext2D
const create_canvas = () => {
  edit_canvas = canvas.value.getContext("2d")
}
const upload = (file: any) => {
  const img: HTMLImageElement = document.createElement("img")
  img.style.width = "100%"
  img.style.height = "100%"
  img.src = file.path
  //   img.onload = () => {}
  edit_canvas.drawImage(imgs.value, 0, 0)
}
onMounted(() => {
  create_canvas()
})
</script>
<style scoped lang="scss">
#edit_canvas {
  max-width: 700px;
  max-height: 600px;
  overflow: hidden;
}
</style>
