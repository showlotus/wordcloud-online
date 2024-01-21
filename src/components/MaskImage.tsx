import { useState } from 'react'
import { PlusSquareOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import maskImgs from '@/assets/mask'
import { getThemeToken } from '@/lib/utils'
import MaskSvg from './MaskSvg'

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Item = styled.div<{
  $colorBorder: string
  $colorPrimaryBorderHover: string
  $colorPrimary?: string
  $isActive?: boolean
}>`
  width: 40px;
  height: 40px;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid;
  border-color: ${(props) =>
    props.$isActive ? props.$colorPrimaryBorderHover : props.$colorBorder};
  border-radius: 2px;
  box-shadow: 0 0 5px ${(props) => (props.$isActive ? '#ccc' : 'initial')};
  transition: all ease 0.2s;

  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.$colorPrimaryBorderHover};
    box-shadow: 0 0 5px #ccc;
  }
`

export default function MaskImage() {
  const { colorPrimary, colorBorder, colorPrimaryBorderHover } = getThemeToken()

  const [defaultMask] = Object.keys(maskImgs)
  const [currMask, setCurrMask] = useState(defaultMask)

  return (
    <List>
      {Object.keys(maskImgs).map((key) => (
        <Item
          key={key}
          title={key}
          $colorBorder={colorBorder}
          $colorPrimaryBorderHover={colorPrimaryBorderHover}
          $colorPrimary={colorPrimary}
          $isActive={currMask === key}
          onClick={() => setCurrMask(key)}
        >
          <MaskSvg name={key} />
        </Item>
      ))}
      {/* <PlusSquareOutlined /> */}
    </List>
  )
}
