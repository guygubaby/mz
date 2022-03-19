# MZ

[![NPM version](https://img.shields.io/npm/v/@bryce-loskie/mz?color=a1b858&label=)](https://www.npmjs.com/package/@bryce-loskie/mz)

## An zoom image component for vue3 using medium-zoom

## Get Started

```bash
pnpm i @bryce-loskie/mz
```

```html
<script setup lang="ts">
import ZoomImage, { defineZoomOptions } from '@bryce-loskie/mz'

const imageSrcList = ['https://foo.com.png']

const options = defineZoomOptions({
  background: '#fff',
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
```

## License

[MIT](./LICENSE) License © 2022 [guygubaby](https://github.com/guygubaby)
