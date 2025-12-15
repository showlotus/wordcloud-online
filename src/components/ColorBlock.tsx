import { themeColors } from '@/lib/config'
import { useWordCloudStore } from '@/store'

import { Block } from './Block'

export default function ColorBlock() {
  const { themeColor, updateThemeColor } = useWordCloudStore()

  const handleSelectColor = (color: string) => {
    updateThemeColor(color)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {themeColors.map((color) => (
        <Block
          key={color}
          isActive={themeColor === color}
          onClick={() => handleSelectColor(color)}
        >
          <div
            className="w-full h-full rounded-sm"
            style={{ backgroundColor: color }}
          ></div>
        </Block>
      ))}
    </div>
  )
}
