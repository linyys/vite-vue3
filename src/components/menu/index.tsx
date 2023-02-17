import { route_config } from "@/router/config"
import { useRouter } from "vue-router"

const filter_route = (value: string) => {
  const nodes = []
}

export default () => {
  const router = useRouter()
  const routes = route_config
  const nodes: Array<JSX.Element> = []
  routes.map((menu_item, index) => {
    if (menu_item.children && menu_item.children.length >= 1) {
      const children_nodes: Array<JSX.Element> = []
      menu_item.children.map((children, children_index) => {
        children_nodes.push(
          <a-menu-item
            onClick={() => router.push(menu_item.path + "/" + children.path)}
            key={`${index}_${children_index}`}
          >
            {children.name}
          </a-menu-item>
        )
      })
      nodes.push(
        <a-sub-menu key={index} v-slots={{ title: () => menu_item.name }}>
          {...children_nodes}
        </a-sub-menu>
      )
    } else {
      nodes.push(
        <a-menu-item onClick={() => router.push(menu_item.path)} key={index}>
          {menu_item.name}
        </a-menu-item>
      )
    }
  })
  return (
    <a-menu style={{ width: "200px", height: "100vh" }} show-collapse-button>
      <div style={{ height: "40px" }}>
        <a-input
          allow-clear
          onInput={(value: string) => {
            filter_route(value)
          }}
        />
      </div>
      {...nodes}
    </a-menu>
  )
}
