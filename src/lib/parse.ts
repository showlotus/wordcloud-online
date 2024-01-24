import { genToken } from './genToken'

interface Data {
  name: string
  value: number
}

export default function parse(sourceData: string, filterKeys: string[]) {
  const filter = (data: Data[]) =>
    data.filter((v) => !filterKeys.includes(v.name))
  try {
    const data = JSON.parse(sourceData) as Data[]
    return filter(data)
  } catch (e) {
    console.warn('Failed to parse the JSON file.')
    return filter(genToken(sourceData))
  }
}
