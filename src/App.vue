<template>
  <RouterView v-if="route.path === '/login'" />
  <Layout v-else>
    <template #header>
      <Header style="height: 30px; background-color: #fff">
        <template #right>
          <div class="right">
            <icon-lock size="20" />
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
const route = useRoute()
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
