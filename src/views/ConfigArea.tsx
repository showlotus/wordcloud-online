import React from 'react'
import { Button, Form, Input, Select } from 'antd'
import MaskImage from '@/components/MaskImage'
import ColorBlock from '@/components/ColorBlock'

export default function ConfigArea() {
  const options = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
    { label: 'C', value: 'c' },
    { label: 'D', value: 'd' },
    { label: 'E', value: 'e' },
    { label: 'F', value: 'f' },
  ]
  return (
    <Form layout="vertical" style={{ width: '300px' }}>
      <Form.Item label="背景">
        <MaskImage />
      </Form.Item>
      <Form.Item label="主题色">
        <ColorBlock />
      </Form.Item>
      <Form.Item label="文本源">
        <Input.TextArea
          rows={4}
          autoSize={{ minRows: 4, maxRows: 8 }}
          allowClear
        />
      </Form.Item>
      <Form.Item label="过滤词性">
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%', textAlign: 'left' }}
          placeholder="请选择要过滤的词性"
          options={options}
        />
      </Form.Item>
      <Form.Item>
        <Button>生成</Button>
      </Form.Item>
    </Form>
  )
}
