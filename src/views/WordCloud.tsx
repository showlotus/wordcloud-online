import * as echarts from 'echarts'
import 'echarts-wordcloud'
import convert from 'color-convert'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import maskImgs from '@/lib/mask'
import { data } from './data'
// import { genToken } from '@/lib/genToken'

function WordCloud() {
  const themeColor = useSelector((state: RootState) => state.themeColor.value)
  const maskImage = useSelector((state: RootState) => state.maskImage.value)

  const elRef = useRef(null)
  const img = new Image()

  // const data = genToken()
  const option = {
    tooltip: {},
    series: [
      // 配置参考：https://github.com/ecomfe/echarts-wordcloud?tab=readme-ov-file#usage
      {
        type: 'wordCloud',
        sizeRange: [4, 150],
        rotationRange: [0, 30],
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
            const [h, , l] = convert.hex.hsl(themeColor)
            const c1 = convert.hsl.rgb([
              h,
              Math.floor(Math.random() * 90) + 10,
              l,
            ])
            return `rgb(${c1})`
          },
        },
        emphasis: {
          textStyle: {
            color: '#000',
            // color: themeColor,
            shadowBlur: 10,
            shadowColor: '#333',
          },
        },
        data,
      },
    ],
  }

  useEffect(() => {
    const chart = echarts.init(elRef.current)
    // chart.on('finished', function () {
    //   console.log('finished')
    // })
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
