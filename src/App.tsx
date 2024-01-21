import { ConfigProvider, Divider } from 'antd'
import './App.css'
import WordCloud from '@/views/WordCloud'
import ConfigArea from '@/views/ConfigArea'

function App() {
  const colorPrimary = '#c63520'
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary,
          borderRadius: 2,

          // 派生变量，影响范围小
          // colorBgContainer: '#f6ffed',
        },
      }}
    >
      <div className="flex justify-evenly">
        <WordCloud />
        <Divider
          type="vertical"
          style={{ height: 'auto', borderColor: colorPrimary }}
        />
        <ConfigArea />
      </div>
    </ConfigProvider>
  )
}

export default App
