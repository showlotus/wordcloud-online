import maskImgs from '@/lib/mask'
import MaskSvg from './MaskSvg'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { updateMaskImage } from '@/store/maskImageSlice'
import { Block } from './Block'

export default function MaskImage() {
  const maskImage = useSelector((state: RootState) => state.maskImage.value)
  const dispatch = useDispatch()

  const handleSelectMaskImage = (imgName: string) => {
    dispatch(updateMaskImage(imgName))
  }

  return (
    <div className="flex flex-wrap gap-2">
      {Object.keys(maskImgs).map((img) => (
        <Block
          key={img}
          title={img}
          isActive={maskImage === img}
          onClick={() => handleSelectMaskImage(img)}
        >
          <MaskSvg name={img} />
        </Block>
      ))}
      {/* <PlusSquareOutlined /> */}
    </div>
  )
}
