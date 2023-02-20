<template>
  <Lock :flag="is_lock" @unlock="is_lock = false" />
  <RouterView v-if="route.path === '/login'" />
  <Layout v-else>
    <template #header>
      <Header style="height: 30px; background-color: #fff">
        <template #right>
          <div class="right">
            <icon-lock size="20" @click="is_lock = true" />
            <a-avatar :size="20">A</a-avatar>
            <a-popover>
              <icon-computer size="20" />
            </a-popover>
          </div>
        </template>
      </Header>
    </template>
    <template #menu>
      <Menu />
    </template>
    <template #main>
      <RouterView />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/layout/index.vue"
import Menu from "@/components/menu/index"
import Header from "@/components/header/index.vue"
import { useRoute } from "vue-router"
import { IconComputer, IconLock } from "@arco-design/web-vue/es/icon"
import Lock from "@/components/lock/index.vue"
import { ref } from "vue"
const route = useRoute()
const is_lock = ref(false)
</script>

<style scoped lang="scss">
.right {
  display: flex;
  & > * {
    cursor: pointer;
    margin: 0 10px;
  }
}
</style>
