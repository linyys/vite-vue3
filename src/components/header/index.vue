<template>
  <div class="l-header">
    <div>
      <slot name="left" />
    </div>
    <div>
      <slot name="right" />
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss">
.l-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
}
</style>
