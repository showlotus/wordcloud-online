import * as echarts from 'echarts'
import 'echarts-wordcloud'
import convert from 'color-convert'
import { useEffect, useRef } from 'react'
import Square from '@/assets/icons/Square.svg'
import { genToken } from '@/lib/genToken'

function WordCloud() {
  const elRef = useRef(null)
  const maskImage = new Image()

  let color = ''
  color = '#d19fec'
  color = '#f5c353'
  color = '#a146c2'
  color = '#4962e3'
  color = '#66a9f1'
  color = '#e6702e'
  color = '#41906b'
  color = '#67bd63'
  color = '#ef8d8a'
  color = '#ce423a'
  const primaryColor = color

  const data = genToken()
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
        maskImage: maskImage,
        drawOutOfBound: false,
        width: '100%',
        height: '100%',
        layoutAnimation: true,
        keepAspect: true,
        textStyle: {
          fontWeight: 'bold',
          color: function () {
            const [h, , l] = convert.hex.hsl(primaryColor)
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
            color: primaryColor,
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
    chart.on('finished', function () {
      console.log('finished')
    })
    maskImage.onload = function () {
      chart.setOption(option)
    }
    maskImage.crossOrigin = 'anonymous'
    maskImage.src = Square
  })

  return <div ref={elRef} style={{ width: '800px', height: '700px' }}></div>
}

export default WordCloud
