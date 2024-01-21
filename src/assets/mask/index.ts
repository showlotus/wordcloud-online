import Circle from '../icons/Circle.svg'
import Collect from '../icons/Collect.svg'
import Ellipse from '../icons/Ellipse.svg'
import Heart from '../icons/Heart.svg'
import Hyperelliptic from '../icons/Hyperelliptic.svg'
import QQ from '../icons/QQ.svg'
import Square from '../icons/Square.svg'
import Triangle from '../icons/Triangle.svg'
import WeChat from '../icons/WeChat.svg'
import Whale from '../icons/Whale.svg'

interface MaskImage {
  [Key: string]: string
}

const Mask: MaskImage = {
  Circle,
  Collect,
  Heart,
  Hyperelliptic,
  Square,
  Whale,
  QQ,
  WeChat,
  Triangle,
  Ellipse,
}

export default Mask
