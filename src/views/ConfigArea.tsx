import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input, Select } from 'antd'
import styled from 'styled-components'
import MaskImage from '@/components/MaskImage'
import ColorBlock from '@/components/ColorBlock'
import { updateSourceData } from '@/store/sourceDataSlice'
import { txtDemo } from '@/assets/data/txtDemo'

const Wrap = styled.div`
  .custom-input {
    &:hover {
      border-color: #000;
    }

    &:focus {
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }

    &:focus-within {
      border-color: #000;
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }

    .ant-input-data-count {
      /* top: -22px; */
    }
  }
`

export default function ConfigArea() {
  const dispatch = useDispatch()

  const [inputValue, setInputValue] = useState(txtDemo)
  const options = [
    {
      label: '李白',
      value: '李白',
    },
    {
      label: '杜甫',
      value: '杜甫',
    },
  ]
  const handleChange = (value: string) => {
    console.log(value)
  }

  useEffect(() => {
    dispatch(updateSourceData(inputValue))
  })

  return (
    <Wrap>
      <Form layout="vertical" style={{ flex: '400px 1 300px' }}>
        <Form.Item label="背景">
          <MaskImage />
        </Form.Item>
        <Form.Item label="主题色">
          <ColorBlock />
        </Form.Item>
        <Form.Item label="文本源">
          <Input.TextArea
            className="custom-input"
            value={inputValue}
            showCount
            rows={4}
            autoSize={{ minRows: 4, maxRows: 8 }}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="过滤词">
          <Select
            className="custom-input"
            mode="tags"
            allowClear
            style={{ width: '100%', textAlign: 'left' }}
            placeholder="请输入要过滤的词"
            onChange={handleChange}
            options={options}
          />
        </Form.Item>
      </Form>
    </Wrap>
  )
}
