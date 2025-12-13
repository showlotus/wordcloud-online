import { useDispatch, useSelector } from 'react-redux'

import { themeColors } from '@/lib/config'
import type { RootState } from '@/store'
import { updateThemeColor } from '@/store/themeColorSlice'

import { Block } from './Block'

export default function ColorBlock() {
  const themeColor = useSelector((state: RootState) => state.themeColor.value)
  const dispatch = useDispatch()

  const handleSelectColor = (color: string) => {
    dispatch(updateThemeColor(color))
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
