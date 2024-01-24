import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Select } from 'antd'
import styled from 'styled-components'
import MaskImage from '@/components/MaskImage'
import ColorBlock from '@/components/ColorBlock'
import { updateSourceData } from '@/store/sourceDataSlice'
import type { RootState } from '@/store'
import { updateFilterKeys } from '@/store/filterKeysSlice'

const Wrap = styled.div`
  .custom-input {
    &:hover {
      border-color: #000;

      .ant-select-selector {
        border-color: #000 !important;
      }
    }

    &:focus {
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }

    &:focus-within {
      border-color: #000;
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);

      .ant-select-selector {
        border-color: #000 !important;
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1) !important;
      }
    }

    .ant-input-data-count {
      /* top: -22px; */
    }
  }
`

export default function ConfigArea() {
  const filterKeys = useSelector((state: RootState) => state.filterKeys.value)
  const sourceData = useSelector((state: RootState) => state.sourceData.value)
  const dispatch = useDispatch()

  const options = [
    { name: 'A', value: 'A' },
    { name: 'B', value: 'B' },
  ]

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
            value={sourceData}
            // showCount
            rows={4}
            autoSize={{ minRows: 4, maxRows: 8 }}
            onChange={(e) => dispatch(updateSourceData(e.target.value))}
          />
        </Form.Item>
        <Form.Item label="过滤词">
          <Select
            className="custom-input"
            mode="multiple"
            allowClear
            style={{ width: '100%', textAlign: 'left' }}
            placeholder="请输入要过滤的词"
            value={filterKeys}
            options={options}
            onChange={(value) => dispatch(updateFilterKeys(value))}
          />
        </Form.Item>
      </Form>
    </Wrap>
  )
}
