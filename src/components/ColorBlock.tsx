import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { themeColors } from '@/lib/config'
import { getThemeToken } from '@/lib/utils'
import type { RootState } from '@/store'
import { updateThemeColor } from '@/store/themeColorSlice'

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Block = styled.div<{
  $isActive: boolean
  $colorBorder: string
  $colorPrimaryBorderHover: string
}>`
  padding: 6px;
  width: 40px;
  height: 40px;
  border: 1px solid;
  border-color: ${(props) => (props.$isActive ? '#000' : '#d9d9d9')};
  border-radius: 2px;
  box-shadow: ${(props) =>
    props.$isActive ? '0 0 0 2px rgba(0, 0, 0, 0.1)' : 'initial'};
  transition: all ease 0.2s;

  cursor: pointer;

  &:hover {
    border-color: #000;
    /* box-shadow: 0 0 5px #ccc; */
  }
`

export default function ColorBlock() {
  const themeColor = useSelector((state: RootState) => state.themeColor.value)
  const dispatch = useDispatch()

  const { colorBorder, colorPrimaryBorderHover } = getThemeToken()
  console.log(colorBorder, colorPrimaryBorderHover)
  const handleSelectColor = (color: string) => {
    dispatch(updateThemeColor(color))
  }

  return (
    <Wrap>
      {themeColors.map((color) => (
        <Block
          key={color}
          $isActive={color === themeColor}
          $colorBorder={colorBorder}
          $colorPrimaryBorderHover={colorPrimaryBorderHover}
          onClick={() => handleSelectColor(color)}
        >
          <div
            className="w-full h-full rounded-sm"
            style={{ backgroundColor: color }}
          ></div>
        </Block>
      ))}
    </Wrap>
  )
}
