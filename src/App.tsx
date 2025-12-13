import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ConfigProvider, Divider, Spin } from 'antd'
import { GithubOutlined, LoadingOutlined } from '@ant-design/icons'
import WordCloud from '@/views/WordCloud'
import ConfigArea from '@/views/ConfigArea'
import parseToken from './lib/parseToken'
import { updateSourceToken } from './store/sourceTokenSlice'
import { updateTokenKeys } from './store/tokenKeysSlice'
import { updateFilterKeys } from './store/filterKeysSlice'
import { jsonDemo } from './assets/data/jsonDemo'
import './App.less'

function App() {
  const dispatch = useDispatch()
  const [spinning, setSpinning] = useState(false)

  const handleUpdateSourceData = useCallback((data: string) => {
    setSpinning(true)
    parseToken(data).then((tokens) => {
      const tokenKeys = tokens.map((v) => ({ label: v.name, value: v.name }))
      dispatch(updateSourceToken(tokens))
      dispatch(updateTokenKeys(tokenKeys))
      dispatch(updateFilterKeys([]))
      setSpinning(false)
    })
  }, [])

  const handleOpenGithub = () => {
    window.open('https://github.com/showlotus/wordcloud-online')
  }

  useEffect(() => {
    parseToken(jsonDemo).then((tokens) => {
      const tokenKeys = tokens.map((v) => ({ label: v.name, value: v.name }))
      dispatch(updateSourceToken(tokens))
      dispatch(updateTokenKeys(tokenKeys))
    })
  }, [])

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#aaa',
          borderRadius: 4,
        },
      }}
    >
      <div className="flex justify-evenly">
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
      </div>
      <div
        className="fixed right-0 top-0 w-16 aspect-square"
        style={{
          background:
            'linear-gradient(to right top, transparent 50%, #ffc12f 51%)',
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
