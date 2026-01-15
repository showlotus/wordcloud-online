import { useCallback, useEffect, useState } from 'react'

import { GithubOutlined, LoadingOutlined } from '@ant-design/icons';
import { ConfigProvider, Divider, Segmented, Spin } from 'antd'

import { ConfigArea } from '@/views/ConfigArea'
import { RankList } from '@/views/RankList'
import { WordCloud } from '@/views/WordCloud'

import { jsonDemo } from './assets/data/jsonDemo'
import { useWordCount } from './hooks/useWordCount'
import { type TokenKey, useWordCloudStore } from './store'

import pkg from '../package.json'

import './App.less'

function App() {
  const { updateSourceToken, updateTokenKeys, updateFilterKeys } =
    useWordCloudStore()
  const [spinning, setSpinning] = useState(false)
  const [view, setView] = useState<'词云' | '词频'>('词云')
  const analyze = useWordCount()

  const dispatchData = (tokens: TokenKey[]) => {
    const tokenKeys = tokens.sort((a, b) => b.value - a.value)
    updateSourceToken(tokens)
    updateTokenKeys(tokenKeys)
    updateFilterKeys([])
  }

  const handleUpdateSourceData = useCallback(async (data: string) => {
    setSpinning(true)
    try {
      const parsedData = JSON.parse(data) as TokenKey[]
      dispatchData(parsedData)
    } catch (e) {
      const start = performance.now()
      const tokens = await analyze(data)
      const end = performance.now()
      console.log(`analyze words took: ${end - start}ms`)
      dispatchData(tokens)
    } finally {
      setSpinning(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleOpenGithub = () => {
    window.open(pkg.homepage as string)
  }

  useEffect(() => {
    const parsedData = JSON.parse(jsonDemo) as TokenKey[]
    dispatchData(parsedData)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
        <div className="flex-1 flex flex-col gap-4">
          <Segmented
            className="self-center"
            options={['词云', '词频']}
            value={view}
            onChange={(value) => setView(value as '词云' | '词频')}
          />
          <div className={view === '词云' ? 'block' : 'hidden'}>
            <WordCloud />
          </div>
          <div className={view === '词频' ? 'block' : 'hidden'}>
            <RankList />
          </div>
        </div>
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
