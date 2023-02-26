<template>
  <a-card style="margin: 5px">
    <div id="task-box">
      <div
        class="task-box"
        v-for="(item, index) in task_data"
        :key="index"
        :ondragover="(e:any) => e.preventDefault()"
        :ondrop="() => dragend(item)"
      >
        <p>{{ item.state_name }}</p>
        <a-card
          hoverable
          v-for="(value, key) in item.items"
          :key="key"
          draggable="true"
          :ondragstart="() => dragstart(value, item)"
          :ondragend="(drag_data = null)"
        >
          <template #cover>
            <p>{{ value[1].name }}</p>
            <a-countdown
              :value="value[1].deadline + Math.random() * 100000"
              :now="value[1].deadline + Math.random() * 100000"
              :value-style="{ fontSize: '16px' }"
            />
          </template>
          <icon-close-circle-fill
            :style="{ color: '#F98981' }"
            v-if="item.state === 0"
          />
          <icon-exclamation-circle-fill
            :style="{ color: '#FADC6D' }"
            v-else-if="item.state === 1"
          />
          <icon-minus-circle-fill
            :style="{ color: '#7BC0FC' }"
            v-else-if="item.state === 2"
          />
          <icon-check-circle-fill
            :style="{ color: '#C9E968' }"
            v-else-if="item.state === 3"
          />
        </a-card>
      </div>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
import { reactive } from "vue"
import {
  IconCloseCircleFill,
  IconExclamationCircleFill,
  IconMinusCircleFill,
  IconCheckCircleFill
} from "@arco-design/web-vue/es/icon"
interface item {
  name: string
  deadline: number
}

interface task_type {
  state_name: string
  state: number
  items: Map<number, item>
}
let drag_data: [number, item] | null = null
let drag_task: task_type
const dragstart = (item: [number, item], task: task_type) => {
  drag_data = item
  drag_task = task
}

const dragend = (task: task_type) => {
  if (task === drag_task || drag_data == null) return
  task.items.set(drag_data[0], drag_data[1])
  drag_task.items.delete(drag_data[0])
}
const f = (c: number, z: number) => {
  let hash: Map<number, item> = new Map()
  for (let i = 0; i < c; i++) {
    hash.set(i + z, {
      name: "name" + i,
      deadline: new Date().getTime()
    })
  }
  return hash
}
const task_data: Array<task_type> = reactive([
  {
    state_name: "已拒绝",
    state: 0,
    items: f(3, 1)
  },
  {
    state_name: "未接受",
    state: 1,
    items: f(0, 2)
  },
  {
    state_name: "进行中",
    state: 2,
    items: f(1, 3)
  },
  {
    state_name: "已完成",
    state: 3,
    items: f(3, 4)
  }
])
</script>
<style scoped lang="scss">
#task-box {
  border: 1px solid #000;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: 100%;
  height: 83vh;
}
.task-box {
  border: 1px solid #000;
  text-align: center;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
.task-box > div {
  text-align: left;
  padding: 10px;
  margin: 10px;
}
</style>
