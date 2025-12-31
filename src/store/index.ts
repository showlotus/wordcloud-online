import { create } from 'zustand'

import { themeColors } from '@/lib/config'
import maskImgs from '@/lib/mask'

// 定义状态类型
interface WordCloudState {
  themeColor: string
  maskImage: string
  filterKeys: string[]
  tokenKeys: TokenKey[]
  sourceToken: TokenKey[]

  // 定义更新方法
  updateThemeColor: (color: string) => void
  updateMaskImage: (image: string) => void
  updateFilterKeys: (keys: string[]) => void
  updateTokenKeys: (keys: TokenKey[]) => void
  updateSourceToken: (tokens: TokenKey[]) => void
}

export type TokenKey = { name: string; value: number }

// 创建 zustand store
export const useWordCloudStore = create<WordCloudState>((set) => ({
  themeColor: themeColors[0],
  maskImage: Object.keys(maskImgs)[0],
  filterKeys: [],
  tokenKeys: [],
  sourceToken: [],

  updateThemeColor: (color) => set({ themeColor: color }),
  updateMaskImage: (image) => set({ maskImage: image }),
  updateFilterKeys: (keys) => set({ filterKeys: keys }),
  updateTokenKeys: (keys) => set({ tokenKeys: keys }),
  updateSourceToken: (tokens) => set({ sourceToken: tokens })
}))

export type RootState = WordCloudState
