import React from 'react'

import Circle from '@/assets/icons/Circle.svg?react'
import Collect from '@/assets/icons/Collect.svg?react'
import Ellipse from '@/assets/icons/Ellipse.svg?react'
import Heart from '@/assets/icons/Heart.svg?react'
import Hyperelliptic from '@/assets/icons/Hyperelliptic.svg?react'
import QQ from '@/assets/icons/QQ.svg?react'
import Square from '@/assets/icons/Square.svg?react'
import Triangle from '@/assets/icons/Triangle.svg?react'
import WeChat from '@/assets/icons/WeChat.svg?react'
import Whale from '@/assets/icons/Whale.svg?react'
import { getThemeToken } from '@/lib/utils'

interface MaskSvgProps {
  name: string
}

interface Ops {
  [Key: string]: React.FC<React.ComponentProps<'svg'>>
}

export default function MaskSvg(props: MaskSvgProps) {
  const { colorPrimary } = getThemeToken()
  const ops: Ops = {
    Circle,
    Collect,
    Ellipse,
    Heart,
    Hyperelliptic,
    QQ,
    Square,
    Triangle,
    WeChat,
    Whale,
  }
  const Component = ops[props.name] || <></>
  return <Component width={30} height={30} color={colorPrimary} />
}
