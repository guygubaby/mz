<script setup lang="ts">
import ZoomImage, { defineZoomOptions } from '@bryce-loskie/mz'
import { imageSrcList } from '@/constants/images'
import { isDark } from '@/logic/dark'

const options = computed(()=>defineZoomOptions({
  background: isDark.value ? '#000' : '#fff',
  margin: 24,
}))
</script>

<template>
  <div>
    <h1 mb="4">
      Zoom Image
    </h1>

    <ul class="flex gap-2 flex-wrap">
      <li v-for="(img,i) in imageSrcList" :key="img">
        <ZoomImage alt="foo" :src="img" :preview="i%2===0" :zoom-options="options" class="w-40 h-auto" />
        <span>preview: {{ i%2===0 }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
.foo {
  background: red;
}
</style>
