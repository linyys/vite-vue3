<template>
  <a-card style="margin: 10px">
    <div>
      <uploadImg @uploaded="upload" v-show="!is_loaded" />
      <div>
        <div></div>
        <canvas
          ref="Canvas"
          width="700"
          height="590"
          v-show="is_loaded"
          @mousedown="moveStart"
          @mouseup="moveEnd"
          @mousemove="move"
        />
      </div>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
import uploadImg from "@/components/uploadImg/index.vue"
import { onMounted } from "vue"
import { ref } from "vue"
const Canvas = ref()
const is_loaded = ref(false)

let edit_canvas: CanvasRenderingContext2D
const create_canvas = () => {
  edit_canvas = Canvas.value.getContext("2d")
}
const upload = (file: any) => {
  const canvas: HTMLCanvasElement = Canvas.value
  const img: HTMLImageElement = document.createElement("img")
  img.style.width = "100%"
  img.style.height = "100%"
  img.src = file.path
  img.onload = () => {
    is_loaded.value = true
    edit_canvas.drawImage(img, 0, 0, canvas.width, canvas.height)
    let pattern = edit_canvas.createPattern(img, "no-repeat")
    canvas.fillStyle = pattern
  }
}

let is_down = false
let img_data: any
const moveStart = () => {
  is_down = true
  img_data = edit_canvas.getImageData(
    0,
    0,
    Canvas.value.width,
    Canvas.value.height
  )
}

const move = (e: any) => {
  if (!is_down) {
    return
  }
  edit_canvas.moveTo(e.offsetY, e.offsetX)
  let index = (e.offsetY * img_data.width + e.offsetX) * 4
  img_data.data[index] = 255
  img_data.data[index + 1] = 0
  img_data.data[index + 2] = 0
  img_data.data[index + 3] = 255
  edit_canvas.putImageData(img_data, 0, 0)
}

const moveEnd = () => {
  is_down = false
  img_data = null
}

onMounted(() => {
  create_canvas()
})
</script>
<style scoped lang="scss">
canvas {
  display: block;
  overflow: hidden;
}
</style>
