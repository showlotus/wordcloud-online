import { Segment, useDefault, Optimizer } from 'segmentit'

export interface TokenType {
  name: string
  value: number
}

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
const MAX_PARSE_LEN = 10000
/**
 * 最大 tokens 数量
 */
const MAX_COUNT = 500

function wait(time = 200) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

async function asyncParse(str: string) {
  const res: Word[] = []
  do {
    const currStr = str.slice(0, MAX_PARSE_LEN)
    str = str.slice(MAX_PARSE_LEN)
    const tokens = segmentit.doSegment(currStr) as Word[]
    res.push(...tokens)
    await wait()
  } while (str.length !== 0)
  return res
}

export default async function parseToken(
  sourceData: string
): Promise<TokenType[]> {
  try {
    const data = JSON.parse(sourceData) as TokenType[]
    return Promise.resolve(data)
  } catch (e) {
    console.warn('Failed to parse the JSON file.')

    /**
     * 字符数 => 解析时间
     * 29689 => 877ms 33:1
     * 148448 => 3967ms 37:1
     * 296898 => 8201ms 36:1
     * 大约为每 35 个字符，解析时间为 1ms
     */
    console.log(sourceData.length)
    console.time('parse')
    const tokens = await asyncParse(sourceData)
    const map = new Map()
    for (const { w } of tokens) {
      map.set(w, (map.get(w) || 0) + 1)
    }
    const data = Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .filter((_v, i) => i < MAX_COUNT)
      .map((v) => ({ name: v[0], value: v[1] }))
    console.timeEnd('parse')
    return data as TokenType[]
  }
}
