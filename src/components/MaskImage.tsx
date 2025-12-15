import maskImgs from '@/lib/mask'
import { useWordCloudStore } from '@/store'

import { Block } from './Block'
import MaskSvg from './MaskSvg'

export default function MaskImage() {
  const { maskImage, updateMaskImage } = useWordCloudStore()

  const handleSelectMaskImage = (imgName: string) => {
    updateMaskImage(imgName)
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
