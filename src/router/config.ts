import { RouteRecordRaw } from "vue-router"

export const route_config: Array<RouteRecordRaw> = [
  {
    path: "/home",
    component: () => import("@/views/home/index.vue"),
    name: "Home"
  },
  {
    path: "/task",
    component: () => import("@/views/task/index.vue"),
    name: "Task"
  },
  {
    path: "/menu",
    component: () => import("@/views/menu1/index.vue"),
    name: "Menu1",
    children: [
      {
        path: "sub_menu",
        component: () => import("@/views/menu1/menu2/index.vue"),
        name: "Menu2"
      }
    ]
  },
  {
    path: "/editImg",
    component: () => import("@/views/editImg/index.vue"),
    name: "EditImg"
  }
]
