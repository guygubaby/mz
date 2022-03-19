import type { ZoomOptions } from 'medium-zoom'
import mediumZoom from 'medium-zoom'
import ZoomImage from './components/ZoomImage/index'

export const defineZoomOptions = (options: ZoomOptions) => options

export {
  mediumZoom,
  ZoomImage,
}

export type {
  ZoomOptions,
}

export default ZoomImage
