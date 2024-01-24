import { ConfigProvider, Divider } from 'antd'
import styled from 'styled-components'
import WordCloud from '@/views/WordCloud'
import ConfigArea from '@/views/ConfigArea'
import './App.css'

const Wrap = styled.div`
  display: flex;
  justify-content: space-evenly;
`

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#000',
          // colorPrimaryBorderHover: '#000',
          // colorPrimaryHover: 'transparent',
          borderRadius: 2,
        },
      }}
    >
      <Wrap>
        <WordCloud />
        <Divider
          type="vertical"
          style={{ height: 'auto', marginRight: '50px' }}
        />
        <ConfigArea />
      </Wrap>
    </ConfigProvider>
  )
}

export default App
