import { Segment, useDefault, Optimizer } from 'segmentit'
import type { TokenType } from './parseToken'

interface Word {
  w: string
  p: number
}

class CustomOptimizer extends Optimizer {
  doOptimize(words: Word[]): Word[] {
    // 各种词性对应的值：https://github.com/leizongmin/node-segment/blob/master/lib/POSTAG.js
    const POSTAG = this.segment.POSTAG
    // 需要过滤掉的词性列表
    const types = [
      POSTAG.D_W, // 标点符号
    ]
    // 自定义过滤规则
    const rules = /^\d+$/
    return words.filter(({ w, p }) => !(types.includes(p) || rules.test(w)))
  }
}

// eslint-disable-next-line react-hooks/rules-of-hooks
const segmentit = useDefault(new Segment())
segmentit.use(CustomOptimizer)

/**
 * 最大处理字符长度
 */
const MAX_PARSE_LEN = 100

function wait(time = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

async function asyncParse(str: string) {
  const res: Word[] = []
  while (str.length > MAX_PARSE_LEN) {
    const currStr = str.slice(0, MAX_PARSE_LEN)
    str = str.slice(MAX_PARSE_LEN)
    const tokens = segmentit.doSegment(currStr) as Word[]
    res.push(...tokens)
    await wait()
  }
  console.log('res', res)
  return res
}

export async function genToken(str: string) {
  const MAX_COUNT = 500
  // TEST parse: 48746.538818359375 ms
  // 1w 个字符平均解析速度为 100ms 内
  console.time('parse')
  const tokens = await asyncParse(str)
  console.timeEnd('parse')
  const map = new Map()
  for (const { w } of tokens) {
    map.set(w, (map.get(w) || 0) + 1)
  }
  const data = Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .filter((_v, i) => i < MAX_COUNT)
    .map((v) => ({ name: v[0], value: v[1] }))
  return data as TokenType[]
}
