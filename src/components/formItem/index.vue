<template>
  <a-form-item v-for="item in form_data" :key="item.name"> </a-form-item>
</template>
<script lang="ts" setup>
import { formItem } from "./types"
const props = defineProps({
  form_data: {
    type: Array<formItem>,
    request: true,
    default: () => {
      return {}
    }
  }
})
</script>
<style scoped></style>
