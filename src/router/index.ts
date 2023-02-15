import Home from "@/views/home/index.vue"
import type { RouteRecordRaw } from "vue-router"
import { createRouter, createWebHistory } from "vue-router"
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home
  }
]
export const router = createRouter({
  history: createWebHistory(),
  routes: routes
})
