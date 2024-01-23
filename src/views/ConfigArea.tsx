import { Form, Input } from 'antd'
import styled from 'styled-components'
import MaskImage from '@/components/MaskImage'
import ColorBlock from '@/components/ColorBlock'
import { TangPoetry } from '@/assets/data/demo'

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
  }
`

export default function ConfigArea() {
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
            value={TangPoetry}
            rows={4}
            autoSize={{ minRows: 4, maxRows: 8 }}
            className="custom-input"
          />
        </Form.Item>
        {/* <Form.Item label="过滤词性">
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%', textAlign: 'left' }}
          placeholder="请选择要过滤的词性"
          options={[
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' },
            { label: 'D', value: 'd' },
            { label: 'E', value: 'e' },
            { label: 'F', value: 'f' },
          ]}
        />
      </Form.Item>
      <Form.Item>
        <Button>生成</Button>
      </Form.Item> */}
      </Form>
    </Wrap>
  )
}
