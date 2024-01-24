import { Segment, useDefault, Optimizer } from 'segmentit'

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

export function genToken(str: string) {
  const tokens = segmentit.doSegment(str) as Word[]
  const map = new Map()
  for (const { w } of tokens) {
    map.set(w, (map.get(w) || 0) + 1)
  }
  const data = Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    // .filter((_v, i) => i < 100)
    .map((v) => ({ name: v[0], value: v[1] }))
  return data
}
