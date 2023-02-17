import login from "@/views/login/index.vue"
import type { RouteRecordRaw } from "vue-router"
import { createRouter, createWebHistory } from "vue-router"
import { route_config } from "./config"
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: login
  }
]
routes.push(...route_config)

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
})
