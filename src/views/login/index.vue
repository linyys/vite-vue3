<template>
  <div>
    <!-- <canvas id="canvas" class="canvas" ref="canvas" /> -->
    <diV id="canvas" class="canvas"></diV>
    <div class="login">
      <a-form :model="data" @submit="login">
        <a-form-item field="acc" label="Account">
          <a-input
            :model-value="data.acc"
            placeholder="please enter your account..."
          ></a-input>
        </a-form-item>
        <a-form-item field="pwd" label="Password">
          <a-input
            :model-value="data.pwd"
            placeholder="please enter your password..."
          ></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup name="Login">
import { onMounted, reactive, ref } from "vue"
import { useRouter } from "vue-router"
import Konva from "konva"
const router = useRouter()
interface loginData {
  acc: string
  pwd: string
}
const data: loginData = reactive({
  acc: "",
  pwd: ""
})

class Animation {
  layer: any
  stage: any
  duration!: number
  colors: Array<string> = ["#7BE188", "#9FD4FD", "#FBACA3", "#FFF"]
  create() {
    // first we need to create a stage *首先我们需要创建一个舞台
    const stage = new Konva.Stage({
      container: "canvas", // id of container <div> *包裹舞台的DIV元素的ID
      width: window.innerWidth,
      height: window.innerHeight
    })
    // then create layer *然后创建一个图层
    const layer = new Konva.Layer()
    layer.hitGraphEnabled(false)
    stage.add(layer)
    this.layer = layer
    this.stage = stage
    this.duration = 10
  }
  addCircle() {
    const circle = new Konva.Circle({
      x: Math.random() * this.stage.width(),
      y: Math.random() * this.stage.height(),
      radius: 1,
      fill: this.colors[Math.floor(Math.random() * this.colors.length)],
      opacity: 0.3
    })
    circle.listening(false)
    circle.strokeHitEnabled(false)
    circle.shadowForStrokeEnabled(false)
    circle.hitStrokeWidth(0)
    circle.transformsEnabled("position")
    // circle.cache()
    this.layer.add(circle)
    const pathX = Math.floor((circle.x() * 2 - this.stage.width() / 2) * 2)
    const pathY = Math.floor((circle.y() * 2 - this.stage.height() / 2) * 2)
    if (
      pathX > 0 &&
      pathX < this.stage.width() &&
      pathY > 0 &&
      pathY < this.stage.height()
    ) {
      circle.destroy()
    } else {
      const tween = new Konva.Tween({
        node: circle,
        x: pathX,
        y: pathY,
        duration: 5,
        radius: 4,
        opacity: 0.8,
        onFinish: () => {
          tween.destroy()
          circle.destroy()
        }
      })
      tween.play()
    }
  }
  accelerate() {
    this.duration = 2
  }
}
const animation = new Animation()
const login = () => {
  router.push("/home")
  // animation.accelerate()
}
onMounted(() => {
  animation.create()
  animation.addCircle()
  setInterval(() => {
    for (let i = 0; i < 50; i++) {
      animation.addCircle()
    }
  }, 90)
})
</script>
<style scoped>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 350px;
  transform: translate(-50%, -50%);
}
.canvas {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000c24;
}
</style>
