<script setup lang="ts">
import ZoomImage, { defineZoomOptions } from 'mz/index'
import { useDark } from '@vueuse/core'
import { imageSrcList } from '@/constants/images'

const isDark = useDark()

const options = defineZoomOptions({
  background: isDark.value ? '#000' : '#fff',
  margin: 24,
})
</script>

<template>
  <div>
    <h1 mb="4">
      Zoom Image
    </h1>

    <ul class="flex gap-2 flex-wrap">
      <li v-for="img in imageSrcList" :key="img">
        <ZoomImage alt="foo" :src="img" :zoom-options="options" class="w-40 h-auto" />
      </li>
    </ul>
  </div>
</template>
