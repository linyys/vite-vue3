<template>
  <Transition>
    <div
      class="lock"
      tabindex="-1"
      @keydown.enter="unlock_show = true"
      @keydown.esc="unlock_show = false"
      :style="{ filter: unlock_show ? 'blur(5px)' : 'blur(0)' }"
      v-if="flag"
    ></div>
  </Transition>
  <Transition>
    <div class="unlock-box" v-if="unlock_show">
      <div style="margin-bottom: 40px">
        <a-avatar :style="{ backgroundColor: '#14a9f8' }" :size="80"
          >Lin</a-avatar
        >
      </div>
      <a-input-password
        :style="{ width: '320px' }"
        placeholder="Please enter password"
        allow-clear
        @pressEnter="input"
      />
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import { ref } from "vue"

const props = defineProps({
  flag: {
    required: true,
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(["unlock"])
const unlock_show = ref(false)
const input = () => {
  unlock_show.value = false
  emits("unlock")
}
</script>
<style scoped lang="scss">
.lock {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/lock-bg.jpg");
  background-size: 100% 100%;
  z-index: 999;
  transition: filter 0.5s;
}
.unlock-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  text-align: center;
  z-index: 1000;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
