import type { ECharts } from 'echarts'

export default function exportImage(echarts: ECharts | null | undefined) {
  if (!echarts) {
    return
  }

  const canvas = echarts.renderToCanvas({
    backgroundColor: '#fff',
    pixelRatio: 2,
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
