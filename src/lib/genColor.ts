import convert from 'color-convert'

export default function genColor(themeColor: string) {
  const c = convert.hex.rgb(themeColor)
  return `rgb(${c.map(
    (v) => (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 80) + v
  )})`
}
