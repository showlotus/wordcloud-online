import { genToken } from './genToken'

export default function parse(sourceData: string) {
  try {
    const data = JSON.parse(sourceData)
    return data
  } catch (e) {
    console.warn('Failed to parse the JSON file.')
    return genToken(sourceData)
  }
}
