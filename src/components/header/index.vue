<template>
  <div class="l-header">
    <div class="l-header-left">
      <slot name="left" />
    </div>
    <div class="l-header-right">
      <slot name="right" />
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss">
.l-header,
.l-header-left,
.l-header-right {
  display: flex;
  align-items: center;
}
.l-header {
  justify-content: space-between;
  padding: 5px;
}
.l-header-right > *,
.l-header-left > * {
  margin: 0 10px;
}
</style>
