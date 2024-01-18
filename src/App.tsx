import './App.css'
import WordCloud from '@/views/WordCloud'
import ConfigArea from '@/views/ConfigArea'

function App() {
  return (
    <div className="flex justify-evenly">
      <WordCloud />
      <ConfigArea />
    </div>
  )
}

export default App
