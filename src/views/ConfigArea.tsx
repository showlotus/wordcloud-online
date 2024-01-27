import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Select, Upload, message, Popover } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import MaskImage from '@/components/MaskImage'
import ColorBlock from '@/components/ColorBlock'
import type { RootState } from '@/store'
import { updateFilterKeys } from '@/store/filterKeysSlice'
import { txtDemo } from '@/assets/data/txtDemo'
import { jsonDemo } from '@/assets/data/jsonDemo'

const Wrap = styled.div`
  text-align: left;

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
  }
`

const PopoverContent = styled.div`
  max-width: 350px;
  height: 200px;
  overflow: auto;
`

interface Props {
  updateSourceData: (data: string) => void
}

export default function ConfigArea(props: Props) {
  const { updateSourceData } = props
  const filterKeys = useSelector((state: RootState) => state.filterKeys.value)
  const tokenKeys = useSelector((state: RootState) => state.tokenKeys.value)
  const dispatch = useDispatch()

  const handleBeforeUpload = (file: File) => {
    const fileType = file.type
    const validTypes = ['text/plain', 'application/json']
    if (!validTypes.includes(fileType)) {
      message.warning('只能上传 txt 或 json 格式的文件')
      return false
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const fileContent = event.target!.result as string
      updateSourceData(fileContent)
    }
    reader.readAsText(file)
    return false
  }

  return (
    <Wrap>
      <Form
        layout="vertical"
        style={{ flex: '1', minWidth: '300px', maxWidth: '480px' }}
      >
        <Form.Item label="背景">
          <MaskImage />
        </Form.Item>
        <Form.Item label="主题色">
          <ColorBlock />
        </Form.Item>
        <Form.Item label="文本源">
          {/* <Input.TextArea
            className="custom-input"
            value={sourceData}
            showCount
            rows={4}
            autoSize={{ minRows: 4, maxRows: 8 }}
            onChange={(e) => dispatch(updateSourceData(e.target.value))}
          /> */}
          <Upload
            maxCount={1}
            accept=".txt,.json"
            showUploadList={false}
            beforeUpload={handleBeforeUpload}
          >
            <Button
              className="custom-btn"
              icon={<UploadOutlined />}
              style={{ marginTop: '10px', marginRight: '10px' }}
            >
              上传 <i> txt </i> 或 <i> json </i>
            </Button>
          </Upload>
          <Popover
            title="纯文本"
            content={
              <PopoverContent>
                <pre>{txtDemo}</pre>
              </PopoverContent>
            }
          >
            <Button
              className="custom-btn"
              style={{ marginRight: '10px' }}
              onClick={() => updateSourceData(txtDemo)}
            >
              示例一：<i>txt</i>
            </Button>
          </Popover>
          <Popover
            title={
              <span>
                JSON（包含 <i>name</i> 和 <i>value</i> 属性的数组）
              </span>
            }
            content={
              <PopoverContent>
                <pre>{jsonDemo}</pre>
              </PopoverContent>
            }
          >
            <Button
              className="custom-btn"
              onClick={() => updateSourceData(jsonDemo)}
            >
              示例二：<i>json</i>
            </Button>
          </Popover>
        </Form.Item>
        <Form.Item label="过滤词">
          <Select
            className="custom-input"
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="请输入要过滤的词"
            value={filterKeys}
            options={tokenKeys}
            onChange={(value) => dispatch(updateFilterKeys(value))}
          />
        </Form.Item>
      </Form>
    </Wrap>
  )
}
