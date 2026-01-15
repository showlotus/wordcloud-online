import type { ECharts } from 'echarts'

export function exportImage(echarts: ECharts | null | undefined) {
  if (!echarts) {
    return
  }

  const canvas = echarts.renderToCanvas({
    backgroundColor: '#fff',
    pixelRatio: 2
  })

  const img = new Image()
  img.width = 0
  img.src = canvas.toDataURL('image/png')
  document.body.appendChild(img)
  const link = document.createElement('a')
  link.href = img.src
  link.download = 'wordcloud.png'
  link.dispatchEvent(new MouseEvent('click'))
  link.remove()
}

export async function copyImage(echarts: ECharts | null | undefined) {
  if (!echarts) {
    return
  }

  const canvas = echarts.renderToCanvas({
    backgroundColor: '#fff',
    pixelRatio: 2
  })

  await copyCanvas(canvas)
}

export async function copyCanvas(canvas: HTMLCanvasElement) {
  if (!navigator.clipboard || !window.ClipboardItem) {
    throw new Error('Clipboard API not supported')
  }

  return new Promise<void>((resolve, reject) => {
    canvas.toBlob(async (blob: Blob | null) => {
      try {
        if (!blob) {
          throw new Error('Failed to convert canvas to blob')
        }
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ])
        resolve()
      } catch (e) {
        reject(e)
      }
    }, 'image/png')
  })
}
