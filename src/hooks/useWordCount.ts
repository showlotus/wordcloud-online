import { useCallback, useEffect, useRef } from 'react'

interface WordInfo {
  word: string
  tag: string
}

function filterToken(data: WordInfo[]): { name: string; value: number }[] {
  // 不需要的词性：代词、量词、介词、连词、助词、语气词、拟声词、数词
  const unUselessTags = ['r', 'q', 'p', 'c', 'u', 'y', 'o', 'm', 'ul', 'uj']
  const filteredData = data
    .filter((v) => {
      // 过滤掉不需要的词性
      if (unUselessTags.includes(v.tag)) {
        return false
      }

      // 过滤单个字符
      if (v.word.trim().length < 2) {
        return false
      }

      // 过滤掉标点符号
      if (
        v.tag === 'x' &&
        /^[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~„“”«»‚‘’，？、。（）【】《》：；“”‘’、！…]+$/.test(
          v.word
        )
      ) {
        return false
      }

      return true
    })
    .reduce(
      (acc, curr) => {
        acc[curr.word] = (acc[curr.word] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )
  const res = Object.entries(filteredData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .filter((_v, i) => i < 500)
  return res
}

export function useWordCount() {
  const workerRef = useRef<Worker>()

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../workers/word-count.worker.ts', import.meta.url),
      { type: 'module' }
    )
    return () => workerRef.current?.terminate()
  }, [])

  const analyze = useCallback(
    (text: string): Promise<{ name: string; value: number }[]> => {
      return new Promise((resolve) => {
        const handleMessage = (e: MessageEvent) => {
          const data = e.data as WordInfo[]
          const res = filterToken(data)
          resolve(res)
          workerRef.current?.removeEventListener('message', handleMessage)
        }
        workerRef.current?.addEventListener('message', handleMessage)

        workerRef.current?.postMessage({ text })
      })
    },
    []
  )

  return analyze
}
