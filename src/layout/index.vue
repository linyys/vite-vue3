<template>
  <div class="layout">
    <slot name="menu" />
    <div style="width: 100%">
      <slot name="header" />
      <slot name="main" />
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped>
.layout {
  display: flex;
}
</style>
