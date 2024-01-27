import * as echarts from 'echarts'
import 'echarts-wordcloud'
import { useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'antd'
import { DownloadOutlined, SyncOutlined } from '@ant-design/icons'
import type { RootState } from '@/store'
import maskImgs from '@/lib/mask'
import genColor from '@/lib/genColor'
import exportImage from '@/lib/exportImage'

function WordCloud() {
  const themeColor = useSelector((state: RootState) => state.themeColor.value)
  const maskImage = useSelector((state: RootState) => state.maskImage.value)
  const sourceToken = useSelector((state: RootState) => state.sourceToken.value)
  const filterKeys = useSelector((state: RootState) => state.filterKeys.value)

  const data = useMemo(() => {
    console.log('update echarts data')
    return sourceToken.filter((v) => !filterKeys.includes(v.name))
  }, [sourceToken, filterKeys])

  const canvasRef = useRef(null)
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
          color: () => genColor(themeColor),
        },
        emphasis: {
          textStyle: {
            color: themeColor,
            shadowBlur: 10,
            shadowColor: '#333',
          },
        },
        data: data,
      },
    ],
  }

  const handleRefresh = () => {
    if (!canvasRef.current) {
      return
    }

    const instance = echarts.getInstanceByDom(canvasRef.current)
    instance?.resize()
  }

  const handleExport = () => {
    if (!canvasRef.current) {
      return
    }

    const instance = echarts.getInstanceByDom(canvasRef.current)
    exportImage(instance)
  }

  useEffect(() => {
    const chart = echarts.init(canvasRef.current)

    img.onload = function () {
      chart?.setOption(option)
      console.log('render echarts')
    }
    img.crossOrigin = 'anonymous'
    img.src = maskImgs[maskImage]

    return () => {
      chart?.dispose()
    }
  }, [themeColor, maskImage, sourceToken, filterKeys])

  return (
    <div style={{ position: 'relative' }}>
      <div ref={canvasRef} style={{ width: '800px', height: '700px' }}></div>
      <div
        className="tools"
        style={{
          position: 'absolute',
          right: '0',
          bottom: '0',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Button
          className="custom-btn"
          onClick={handleRefresh}
          icon={<SyncOutlined />}
        >
          刷新
        </Button>
        <Button
          className="custom-btn"
          onClick={handleExport}
          icon={<DownloadOutlined />}
        >
          导出
        </Button>
      </div>
    </div>
  )
}

export default WordCloud
