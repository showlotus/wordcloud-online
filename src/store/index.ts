import { create } from 'zustand'

import { themeColors } from '@/lib/config'
import maskImgs from '@/lib/mask'
import type { TokenType } from '@/lib/parseToken'

// 定义状态类型
interface WordCloudState {
  themeColor: string
  maskImage: string
  filterKeys: string[]
  tokenKeys: Array<{ label: string; value: string; title: number }>
  sourceToken: TokenType[]

  // 定义更新方法
  updateThemeColor: (color: string) => void
  updateMaskImage: (image: string) => void
  updateFilterKeys: (keys: string[]) => void
  updateTokenKeys: (
    keys: Array<{ label: string; value: string; title: number }>
  ) => void
  updateSourceToken: (tokens: TokenType[]) => void
}

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
