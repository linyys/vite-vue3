<template>
  <div class="login">
    <a-card>
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
    </a-card>
  </div>
</template>
<script lang="ts" setup name="Login">
import { reactive } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
interface loginData {
  acc: string
  pwd: string
}
const data: loginData = reactive({
  acc: "",
  pwd: ""
})
const login = () => {
  router.push("/home")
}
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
</style>
