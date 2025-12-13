import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { bench, describe } from 'vitest'

import { asyncParse } from '../src/lib/parseToken'
import init, {
  word_count
} from '../src/wasm/wordcount-wasm/build/wordcount_wasm'

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('Parse Tokens Performance Test', async () => {
  // 在 Node.js 环境中直接读取 WASM 文件
  const wasmPath = join(
    __dirname,
    '../src/wasm/wordcount-wasm/build/wordcount_wasm_bg.wasm'
  )
  const wasmBuffer = readFileSync(wasmPath)
  await init(wasmBuffer) // 初始化 WASM

  const text = readFileSync(join(__dirname, '/test.txt'), 'utf-8')

  bench('Rust+WASM', () => {
    word_count(text)
  })

  bench('JS(segmentit)', () => {
    asyncParse(text)
  })
})
