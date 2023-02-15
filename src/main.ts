import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import Arco from "@arco-design/web-vue"
import "@arco-design/web-vue/dist/arco.min.css"
import { router } from "@/router/index"

const app = createApp(App)
app.use(Arco)
app.use(router)
app.mount("#app")
