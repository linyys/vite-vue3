<template>
  <div class="l-header">
    <div class="l-header-lift">
      <slot name="lift" />
    </div>
    <div class="l-header-right">
      <slot name="right" />
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss">
.l-header,
.l-header-lift,
.l-header-right {
  display: flex;
  align-items: center;
}
.l-header {
  justify-content: space-between;
  padding: 5px;
}
.l-header-right > *,
.l-header-lift > * {
  margin: 0 10px;
}
</style>
