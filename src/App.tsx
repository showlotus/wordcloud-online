import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { GithubOutlined, LoadingOutlined } from '@ant-design/icons'
import { ConfigProvider, Divider, Spin } from 'antd'

import ConfigArea from '@/views/ConfigArea'
import WordCloud from '@/views/WordCloud'

import { jsonDemo } from './assets/data/jsonDemo'
import { useWordCount } from './hooks/useWordCount'
import type { TokenType } from './lib/parseToken'
import { updateFilterKeys } from './store/filterKeysSlice'
import { updateSourceToken } from './store/sourceTokenSlice'
import { updateTokenKeys } from './store/tokenKeysSlice'

import pkg from '../package.json'

import './App.less'

function App() {
  const dispatch = useDispatch()
  const [spinning, setSpinning] = useState(false)
  const analyze = useWordCount()

  const dispatchData = (tokens: TokenType[]) => {
    const tokenKeys = tokens.map((v) => ({
      label: v.name,
      value: v.name,
      title: v.value
    }))
    dispatch(updateSourceToken(tokens))
    dispatch(updateTokenKeys(tokenKeys))
    dispatch(updateFilterKeys([]))
  }

  const handleUpdateSourceData = useCallback(async (data: string) => {
    setSpinning(true)
    console.time('analyze words')
    try {
      const parsedData = JSON.parse(data) as TokenType[]
      dispatchData(parsedData)
    } catch (e) {
      const tokens = await analyze(data)
      console.timeEnd('analyze words')
      dispatchData(tokens)
    } finally {
      setSpinning(false)
    }
  }, [])

  const handleOpenGithub = () => {
    window.open(pkg.homepage as string)
  }

  useEffect(() => {
    const parsedData = JSON.parse(jsonDemo) as TokenType[]
    dispatchData(parsedData)
  }, [])

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#aaa',
          borderRadius: 4
        }
      }}
    >
      <div className="flex justify-evenly">
        <Spin
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
      </div>
      <div
        className="fixed right-0 top-0 w-16 aspect-square"
        style={{
          background:
            'linear-gradient(to right top, transparent 50%, #ffc12f 51%)'
        }}
      >
        <GithubOutlined
          className="text-white text-2xl cursor-pointer transition-all duration-300 hover:text-black absolute right-2 top-2"
          onClick={handleOpenGithub}
        />
      </div>
    </ConfigProvider>
  )
}

export default App
