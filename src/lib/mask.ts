import Circle from '@/assets/icons/Circle.svg'
import Collect from '@/assets/icons/Collect.svg'
import Ellipse from '@/assets/icons/Ellipse.svg'
import Heart from '@/assets/icons/Heart.svg'
import Hyperelliptic from '@/assets/icons/Hyperelliptic.svg'
import QQ from '@/assets/icons/QQ.svg'
import Square from '@/assets/icons/Square.svg'
import Triangle from '@/assets/icons/Triangle.svg'
import WeChat from '@/assets/icons/WeChat.svg'
import Whale from '@/assets/icons/Whale.svg'

interface MaskImage {
  [Key: string]: string
}

const maskImgs: MaskImage = {
  Circle,
  Collect,
  Heart,
  Hyperelliptic,
  Square,
  Whale,
  QQ,
  WeChat,
  Triangle,
  Ellipse
}

export default maskImgs
