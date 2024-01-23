/// <reference types="vite/client" />

declare module '*.svg?react' {
  import type * as React from 'react'
  const ReactComponent: React.FC<
    React.ComponentProps<'svg'> & { title?: string }
  >
  export default ReactComponent
}

declare module 'segmentit'
