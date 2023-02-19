<template>
  <a-card style="margin: 10px">
    <div id="task-box">
      <div
        class="task-box"
        v-for="(item, index) in task_data"
        :key="index"
        :ondragover="(e) => e.preventDefault()"
        :ondrop="() => dragend(item)"
      >
        <div
          v-for="(value, key) in item.items"
          :key="key"
          draggable="true"
          :ondragstart="() => dragstart(value, item)"
          :ondragend="(drag_data = null)"
        >
          {{ value[1] }}
        </div>
      </div>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
import { reactive } from "vue"
interface task_type {
  level: number
  state: number
  items: Map<string, string>
}
let drag_data: [string, string] | null = null
let drag_task: task_type | null = null
const dragstart = (item, task) => {
  drag_data = item
  drag_task = task
}

const dragend = (task: task_type) => {
  if (task === drag_task) return
  task.items.set(drag_data[0], drag_data[1])
  drag_task.items.delete(drag_data[0])
}
const f = (c: number) => {
  let hash: Map<string, string> = new Map()
  for (let i = 0; i < c; i++) {
    hash.set("key" + i, "value" + i)
  }
  return hash
}
const task_data: Array<task_type> = reactive([
  {
    level: 1,
    state: 1,
    items: f(3)
  },
  {
    level: 2,
    state: 2,
    items: f(0)
  },
  {
    level: 3,
    state: 2,
    items: f(1)
  },
  {
    level: 4,
    state: 2,
    items: f(0)
  },
  {
    level: 5,
    state: 2,
    items: f(0)
  },
  {
    level: 6,
    state: 2,
    items: f(0)
  },
  {
    level: 7,
    state: 2,
    items: f(0)
  },
  {
    level: 8,
    state: 2,
    items: f(0)
  },
  {
    level: 9,
    state: 2,
    items: f(0)
  }
])
</script>
<style scoped lang="scss">
#task-box {
  border: 1px solid #000;
  display: grid;
  grid-template-columns: repeat(3, 33.3334%);
  grid-template-rows: repeat(3, 33.3334%);
  height: 83vh;
}
.task-box {
  border: 1px solid #000;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
.task-box > div {
  margin: 10px;
  text-align: center;
  height: 50px;
  border: 1px solid red;
}
</style>
