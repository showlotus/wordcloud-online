import { getThemeToken } from '@/lib/utils'
import React, { useState } from 'react'
import styled from 'styled-components'

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

export default function ColorBlock() {
  const { colorBorder, colorPrimaryBorderHover } = getThemeToken()
  const colors = [
    '#ce423a',
    '#ef8d8a',
    '#e6702e',
    '#f5c353',
    '#41906b',
    '#67bd63',
    '#66a9f1',
    '#4962e3',
    '#da9cf1',
    '#a146c2',
  ]
  const [currColor, setCurrColor] = useState(colors[0])

  return (
    <Wrap>
      {colors.map((color) => (
        <Block
          key={color}
          $isActive={color === currColor}
          $colorBorder={colorBorder}
          $colorPrimaryBorderHover={colorPrimaryBorderHover}
          onClick={() => setCurrColor(color)}
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
