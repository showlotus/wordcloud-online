import { useEffect, useMemo, useRef } from 'react'

import { CopyOutlined, DownloadOutlined, SyncOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import * as echarts from 'echarts'
import 'echarts-wordcloud'

import genColor from '@/lib/genColor';
import { copyImage, exportImage } from '@/lib/image';
import maskImgs from '@/lib/mask'
import { cn } from '@/lib/utils'
import { useWordCloudStore } from '@/store'

export function WordCloud({ className }: { className?: string }) {
  const { themeColor, maskImage, sourceToken, filterKeys } = useWordCloudStore()

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
          color: () => genColor(themeColor)
        },
        emphasis: {
          textStyle: {
            color: themeColor,
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        data: data
      }
    ]
  }

  const handleRefresh = () => {
    if (!canvasRef.current) {
      return
    }

    const instance = echarts.getInstanceByDom(canvasRef.current)
    instance?.resize()
  }

  const handleCopy = async () => {
    if (!canvasRef.current) {
      return
    }

    const instance = echarts.getInstanceByDom(canvasRef.current)
    await copyImage(instance)
    message.success('已复制到剪贴板')
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
  }, [themeColor, maskImage, sourceToken, filterKeys]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={cn('relative flex justify-center items-center', className)}>
      <div ref={canvasRef} className="w-[600px] h-[600px]"></div>
      <div className="tools absolute right-0 bottom-0 flex flex-col gap-[10px]">
        <Button
          className="custom-btn"
          onClick={handleRefresh}
          icon={<SyncOutlined />}
        >
          刷新
        </Button>
        <Button
          className="custom-btn"
          onClick={handleCopy}
          icon={<CopyOutlined />}
        >
          复制
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
