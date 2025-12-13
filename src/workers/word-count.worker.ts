/// <reference lib="webworker" />
import init, { word_count } from '../wasm/wordcount-wasm/build/wordcount_wasm'

let ready = false

async function ensureInit() {
  if (!ready) {
    await init()
    ready = true
  }
}

self.onmessage = async (e) => {
  const { text } = e.data

  await ensureInit()

  const result = word_count(text)
  self.postMessage(result)
}
