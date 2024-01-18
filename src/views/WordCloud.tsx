import * as echarts from 'echarts'
import 'echarts-wordcloud'
import { useEffect, useRef } from 'react'
import { data } from '@/views/data'

function WordCloud() {
  const elRef = useRef(null)
  const maskImage = new Image()
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
        maskImage: maskImage,
        drawOutOfBound: false,
        width: '100%',
        height: '100%',
        layoutAnimation: true,
        keepAspect: true,
        textStyle: {
          fontWeight: 'bold',
          color: function () {
            return (
              'rgb(' +
              [
                Math.round(Math.random() * 200) + 20,
                Math.round(Math.random() * 20),
                Math.round(Math.random() * 20) + 20,
              ].join(',') +
              ')'
            )
          },
        },
        emphasis: {
          textStyle: {
            color: '#528',
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
    maskImage.onload = function () {
      chart.setOption(option)
    }
    maskImage.crossOrigin = 'anonymous'
    maskImage.src =
      'https://raw.githubusercontent.com/ecomfe/echarts-wordcloud/master/example/logo.png'
    // window.onresize = chart.resize
  })

  return <div ref={elRef} style={{ width: '800px', height: '600px' }}></div>
}

export default WordCloud
