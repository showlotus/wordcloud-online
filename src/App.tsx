import { ConfigProvider, Divider } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import WordCloud from '@/views/WordCloud'
import ConfigArea from '@/views/ConfigArea'
import './App.css'

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
  cursor: pointer;

  background: linear-gradient(to right top, transparent 50%, #ffc12f 51%);

  .github-icon {
    position: absolute;
    right: 8px;
    top: 8px;
    font-size: 20px;
    color: #fff;
  }
`

function App() {
  const handleOpenGithub = () => {
    window.open('https://github.com/showlotus/wordcloud-online')
  }

  console.log('app render')

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
        <WordCloud />
        <Divider
          type="vertical"
          style={{ height: 'auto', marginRight: '50px' }}
        />
        <ConfigArea />
      </Wrap>
      <GithubWrap onClick={handleOpenGithub}>
        <GithubOutlined className="github-icon" />
      </GithubWrap>
    </ConfigProvider>
  )
}

export default App
