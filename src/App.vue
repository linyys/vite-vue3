<template>
  <RouterView v-if="route.path === '/login'" />
  <Layout v-else>
    <template #header>
      <Header style="height: 30px; background-color: #fff">
        <template #right>
          <a-avatar :size="20">A</a-avatar>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.5 5L5 5L5 2.5L2.5 2.5L2.5 5ZM5 11.25L2.5 11.25L2.5 8.75L5 8.75L5 11.25ZM17.5 11.25L15 11.25L15 8.75L17.5 8.75L17.5 11.25ZM8.75 11.25L11.25 11.25L11.25 8.75L8.75 8.75L8.75 11.25ZM5 17.5L2.5 17.5L2.5 15L5 15L5 17.5ZM15 17.5L17.5 17.5L17.5 15L15 15L15 17.5ZM11.25 17.5L8.75 17.5L8.75 15L11.25 15L11.25 17.5ZM17.5 5L15 5L15 2.5L17.5 2.5L17.5 5ZM8.75 5L11.25 5L11.25 2.5L8.75 2.5L8.75 5Z"
              fill="currentColor"
            ></path>
          </svg>
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
const route = useRoute()
</script>

<style scoped lang="scss"></style>
