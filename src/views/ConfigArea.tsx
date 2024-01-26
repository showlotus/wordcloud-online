import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Select, Spin, Upload, message, Popover } from 'antd'
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import MaskImage from '@/components/MaskImage'
import ColorBlock from '@/components/ColorBlock'
import { updateSourceData } from '@/store/sourceDataSlice'
import type { RootState } from '@/store'
import { updateFilterKeys } from '@/store/filterKeysSlice'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { txtDemo } from '@/assets/data/txtDemo'
import { jsonDemo } from '@/assets/data/jsonDemo'
import { updateSourceToken } from '@/store/sourceTokenSlice'
import { updateTokenKeys } from '@/store/tokenKeysSlice'
import type { TokenType } from '@/lib/parseToken'
import parseToken from '@/lib/parseToken'

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

export default function ConfigArea() {
  const filterKeys = useSelector((state: RootState) => state.filterKeys.value)
  const tokenKeys = useSelector((state: RootState) => state.tokenKeys.value)
  const dispatch = useDispatch()

  const [spinning, setSpinning] = useState(false)

  const handleUpdateTokenKeys = (tokens: TokenType[]) => {
    // dispatch(
    //   updateTokenKeys(tokens.map((v) => ({ label: v.name, value: v.name })))
    // )
  }

  const handleBeforeUpload = (file: File) => {
    const fileType = file.type
    const validTypes = ['text/plain', 'application/json']
    if (!validTypes.includes(fileType)) {
      message.warning('只能上传 txt 或 json 格式的文件')
      return false
    }

    setSpinning(true)

    const reader = new FileReader()
    reader.onload = (event) => {
      const fileContent = event.target!.result
      console.time('parse')
      const tokens = parseToken(fileContent as string)
      console.timeEnd('parse')
      console.log(tokens)

      setSpinning(false)
      // setTimeout(() => {
      // }, 2000)
      // console.log(tokens)
      // dispatch(updateSourceToken(tokens))
      // handleUpdateTokenKeys(tokens)
    }
    reader.readAsText(file)
    return false
  }

  const updateSourceTokenByTxtDemo = () => {
    const tokens = parseToken(txtDemo)
    dispatch(updateSourceToken(tokens))
    handleUpdateTokenKeys(tokens)
  }
  const updateSourceTokenByJsonDemo = () => {
    const tokens = parseToken(jsonDemo)
    dispatch(updateSourceToken(tokens))
    handleUpdateTokenKeys(tokens)
  }

  useEffect(() => {
    updateSourceTokenByJsonDemo()
  })

  return (
    <Wrap>
      <Spin
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        spinning={spinning}
        indicator={<LoadingOutlined />}
        fullscreen
        size="large"
        tip="解析中"
      ></Spin>
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
            content={
              <PopoverContent>
                <pre>{txtDemo}</pre>
              </PopoverContent>
            }
          >
            <Button
              className="custom-btn"
              style={{ marginRight: '10px' }}
              onClick={updateSourceTokenByTxtDemo}
            >
              示例一：<i>txt</i>
            </Button>
          </Popover>
          <Popover
            content={
              <PopoverContent>
                <pre>{jsonDemo}</pre>
              </PopoverContent>
            }
          >
            <Button
              className="custom-btn"
              onClick={updateSourceTokenByJsonDemo}
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
