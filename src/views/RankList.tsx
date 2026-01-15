import { useMemo, useRef } from 'react'

import { FileImageOutlined, FileTextOutlined } from '@ant-design/icons'
import { Button, List, message } from 'antd'
import { domToCanvas } from 'modern-screenshot'

import { copyCanvas } from '@/lib/image'
import { cn } from '@/lib/utils'
import { useWordCloudStore } from '@/store'
import type { TokenKey } from '@/store'

export function RankList({ className }: { className?: string }) {
  const { filterKeys, tokenKeys } = useWordCloudStore()

  const listRef = useRef<HTMLDivElement>(null)

  const list = useMemo(() => {
    return tokenKeys.filter((v) => !filterKeys.includes(v.name)).slice(0, 100)
  }, [tokenKeys, filterKeys])

  const handleCopyAsImage = async () => {
    const target = listRef.current!.querySelector('.ant-spin-nested-loading')
    if (!target) {
      return
    }
    const canvas = await domToCanvas(target, {
      backgroundColor: '#ffffff'
    })
    await copyCanvas(canvas)
    message.success('已复制到剪贴板')
  }

  const handleCopyAsText = async () => {
    await navigator.clipboard.writeText(
      list.map((v, index) => `${index + 1}. ${v.name}: ${v.value}`).join('\n')
    )
    message.success('已复制到剪贴板')
  }

  return (
    <div className={cn('relative flex justify-center items-center', className)}>
      <List
        ref={listRef}
        className="w-[300px] h-[600px] overflow-auto"
        size="small"
        bordered
        footer={<div className="h-4"></div>}
        dataSource={list}
        renderItem={(item: TokenKey, index: number) => (
          <List.Item key={item.name}>
            <div className="w-full flex justify-between items-center">
              <span>
                {index + 1}. {item.name}
              </span>
              <span>{item.value}</span>
            </div>
          </List.Item>
        )}
      />
      <div className="tools absolute right-0 bottom-0 flex flex-col gap-[10px]">
        <Button
          className="custom-btn"
          onClick={handleCopyAsImage}
          icon={<FileImageOutlined />}
        >
          复制为图片
        </Button>
        <Button
          className="custom-btn"
          onClick={handleCopyAsText}
          icon={<FileTextOutlined />}
        >
          复制为文本
        </Button>
      </div>
    </div>
  )
}
