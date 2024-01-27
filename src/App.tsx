import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ConfigProvider, Divider, Spin } from 'antd'
import { GithubOutlined, LoadingOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import WordCloud from '@/views/WordCloud'
import ConfigArea from '@/views/ConfigArea'
import './App.css'
import parseToken from './lib/parseToken'
import { updateSourceToken } from './store/sourceTokenSlice'
import { updateTokenKeys } from './store/tokenKeysSlice'
import { updateFilterKeys } from './store/filterKeysSlice'
import { jsonDemo } from './assets/data/jsonDemo'

const Wrap = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const GithubWrap = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 60px;
  aspect-ratio: 1;

  background: linear-gradient(to right top, transparent 50%, #ffc12f 51%);

  .github-icon {
    position: absolute;
    right: 8px;
    top: 8px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: #000;
    }
  }
`

function App() {
  console.log('app render')
  const dispatch = useDispatch()
  const [spinning, setSpinning] = useState(false)

  const handleUpdateSourceData = useCallback((data: string) => {
    setSpinning(true)
    const tokens = parseToken(data)
    const tokenKeys = tokens.map((v) => ({ label: v.name, value: v.name }))
    dispatch(updateSourceToken(tokens))
    dispatch(updateTokenKeys(tokenKeys))
    dispatch(updateFilterKeys([]))
    setSpinning(false)
  }, [])

  const handleOpenGithub = () => {
    window.open('https://github.com/showlotus/wordcloud-online')
  }

  useEffect(() => {
    const tokens = parseToken(jsonDemo)
    const tokenKeys = tokens.map((v) => ({ label: v.name, value: v.name }))
    dispatch(updateSourceToken(tokens))
    dispatch(updateTokenKeys(tokenKeys))
  }, [])

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#aaa',
          borderRadius: 2,
        },
      }}
    >
      <Wrap>
        <Spin
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          spinning={spinning}
          indicator={<LoadingOutlined />}
          fullscreen
          size="large"
          tip="解析中"
        ></Spin>
        <WordCloud />
        <Divider
          type="vertical"
          style={{ height: 'auto', marginRight: '50px' }}
        />
        <ConfigArea updateSourceData={handleUpdateSourceData} />
      </Wrap>
      <GithubWrap>
        <GithubOutlined className="github-icon" onClick={handleOpenGithub} />
      </GithubWrap>
    </ConfigProvider>
  )
}

export default App
