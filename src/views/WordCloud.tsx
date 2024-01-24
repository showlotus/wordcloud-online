import * as echarts from 'echarts'
import 'echarts-wordcloud'
import convert from 'color-convert'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import maskImgs from '@/lib/mask'
import parse from '@/lib/parse'

function WordCloud() {
  const themeColor = useSelector((state: RootState) => state.themeColor.value)
  const maskImage = useSelector((state: RootState) => state.maskImage.value)
  const sourceData = useSelector((state: RootState) => state.sourceData.value)
  const filterKeys = useSelector((state: RootState) => state.filterKeys.value)

  const elRef = useRef(null)
  const img = new Image()

  const option = {
    tooltip: {},
    series: [
      // 配置参考：https://github.com/ecomfe/echarts-wordcloud?tab=readme-ov-file#usage
      {
        type: 'wordCloud',
        sizeRange: [4, 150],
        rotationRange: [0, 0],
        gridSize: 0,
        shape: 'pentagon',
        maskImage: img,
        drawOutOfBound: false,
        width: '100%',
        height: '100%',
        layoutAnimation: true,
        keepAspect: true,
        textStyle: {
          fontWeight: 'bold',
          color: function () {
            const c = convert.hex.rgb(themeColor)
            return `rgb(${c.map(
              (v) =>
                (Math.random() < 0.5 ? -1 : 1) *
                  Math.floor(Math.random() * 80) +
                v
            )})`
            const [h, , l] = convert.hex.hsl(themeColor)
            const c1 = convert.hsl.rgb([
              h +
                (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 70),
              Math.floor(Math.random() * 50) + 50,
              l,
            ])
            return `rgb(${c1})`
          },
        },
        emphasis: {
          textStyle: {
            // color: '#000',
            color: themeColor,
            shadowBlur: 10,
            shadowColor: '#333',
          },
        },
        data: parse(sourceData, filterKeys),
      },
    ],
  }

  useEffect(() => {
    const chart = echarts.init(elRef.current)
    img.onload = function () {
      chart.setOption(option)
    }
    img.crossOrigin = 'anonymous'
    img.src = maskImgs[maskImage]

    return () => {
      chart.dispose()
    }
  })

  return <div ref={elRef} style={{ width: '800px', height: '700px' }}></div>
}

export default WordCloud
