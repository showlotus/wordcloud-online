import { genToken } from './genToken'

export interface TokenType {
  name: string
  value: number
}

export default function parseToken(sourceData: string): TokenType[] {
  try {
    const data = JSON.parse(sourceData) as TokenType[]
    return data
  } catch (e) {
    console.warn('Failed to parse the JSON file.')
    return genToken(sourceData)
  }
}
