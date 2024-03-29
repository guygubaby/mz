import type { PropType } from 'vue'
import { computed, defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { Zoom, ZoomOpenOptions, ZoomOptions } from 'medium-zoom'
import mediumZoom from 'medium-zoom'

const DEFAULT_FALLBACK = 'data:image/png;base64,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'

const loadImage = (src?: string) => {
  return new Promise<boolean>((resolve) => {
    if (!src) return resolve(false)
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = src
  })
}

const pruneFalsy = (obj: Record<PropertyKey, any>) => {
  return Object.keys(obj).reduce((acc, cur) => {
    if (![null, undefined, ''].includes(obj[cur]))
      acc[cur] = obj[cur]
    return acc
  }, {} as Record<PropertyKey, any>)
}

type Fn = () => void

export default defineComponent({
  props: {
    src: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    width: {
      type: [Number, String],
      default: '',
    },
    height: {
      type: [Number, String],
      default: '',
    },
    preview: {
      type: Boolean,
      default: true,
    },
    zoomOptions: {
      type: Object as PropType<ZoomOptions>,
      default: () => undefined,
    },
    placeholder: {
      type: String,
      default: '',
    },
    fallback: {
      type: String,
      default: '',
    },
  },
  emits: [
    'open',
    'opened',
    'close',
    'closed',
    'detach',
    'update',
  ],
  setup(props, { emit }) {
    const style = computed(() => {
      const { height, width } = props
      const res = pruneFalsy({
        height,
        width,
      })
      return res
    })

    const imageRef = ref<HTMLImageElement>()

    let zoomInstance: Zoom | null = null

    const sideEffects: Fn[] = []

    const disposeZoom = () => {
      if (!zoomInstance) return
      zoomInstance.detach()
      zoomInstance = null

      for (const fn of sideEffects)
        fn()
      sideEffects.length = 0
    }

    const imageSrc = ref('')

    const toFallback = () => {
      imageSrc.value = props.fallback || DEFAULT_FALLBACK
    }

    const toPlaceHolder = () => {
      if (!props.placeholder) return
      imageSrc.value = props.placeholder
    }

    onMounted(() => {
      watch(() => props.zoomOptions, (options) => {
        if (!zoomInstance || !options) return
        zoomInstance.update(options)
      })

      watch(() => props.src, async(_, _src, onCleanup) => {
        onCleanup(disposeZoom)

        if (!imageRef.value) return toFallback()

        toPlaceHolder()

        const { src, preview } = props

        const isSuccess = await loadImage(src)

        if (!isSuccess) return toFallback()

        imageSrc.value = src

        if (!preview) return

        zoomInstance = mediumZoom(imageRef.value, props.zoomOptions)

        const onOpenFn = (event: Event) => {
          emit('open', event)
        }
        zoomInstance.on('open', onOpenFn)
        sideEffects.push(() => {
          zoomInstance?.off('open', onOpenFn)
        })

        const onOpenedFn = (event: Event) => {
          emit('opened', event)
        }
        zoomInstance.on('opened', onOpenedFn)
        sideEffects.push(() => {
          zoomInstance?.off('opened', onOpenedFn)
        })

        const onCloseFn = () => {
          emit('close')
        }
        zoomInstance.on('close', onCloseFn)
        sideEffects.push(() => {
          zoomInstance?.off('close', onCloseFn)
        })

        const onClosedFn = () => {
          emit('closed')
        }
        zoomInstance.on('closed', onClosedFn)
        sideEffects.push(() => {
          zoomInstance?.off('closed', onClosedFn)
        })

        const onDetachFn = () => {
          emit('detach')
        }
        zoomInstance.on('detach', onDetachFn)
        sideEffects.push(() => {
          zoomInstance?.off('detach', onDetachFn)
        })

        const onUpdateFn = () => {
          emit('update')
        }
        zoomInstance.on('update', onUpdateFn)
        sideEffects.push(() => {
          zoomInstance?.off('update', onUpdateFn)
        })
      }, {
        immediate: true,
        flush: 'post',
      })
    })

    onBeforeUnmount(disposeZoom)

    const open = async(options?: ZoomOpenOptions | undefined) => {
      await zoomInstance?.open(options)
    }

    const close = async() => {
      await zoomInstance?.close()
    }

    const detach = () => {
      zoomInstance?.detach()
    }

    return {
      imageRef,
      imageSrc,
      style,
      open,
      close,
      detach,
    }
  },
  render() {
    return h('img', {
      ref: 'imageRef',
      src: this.imageSrc,
      alt: this.alt,
      style: this.style,
    })
  },
})
