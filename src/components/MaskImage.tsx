import styled from 'styled-components'
import maskImgs from '@/lib/mask'
import MaskSvg from './MaskSvg'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { updateMaskImage } from '@/store/maskImageSlice'

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Item = styled.div<{
  $isActive?: boolean
}>`
  width: 40px;
  height: 40px;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid;
  border-color: ${(props) => (props.$isActive ? '#000' : '#d9d9d9')};
  border-radius: 2px;
  box-shadow: ${(props) =>
    props.$isActive ? '0 0 0 2px rgba(0, 0, 0, 0.1)' : 'initial'};
  transition: all ease 0.2s;

  cursor: pointer;

  &:hover {
    border-color: #000;
  }
`

export default function MaskImage() {
  const maskImage = useSelector((state: RootState) => state.maskImage.value)
  const dispatch = useDispatch()

  const handleSelectMaskImage = (imgName: string) => {
    console.log(imgName)
    dispatch(updateMaskImage(imgName))
  }

  return (
    <List>
      {Object.keys(maskImgs).map((img) => (
        <Item
          key={img}
          title={img}
          $isActive={maskImage === img}
          onClick={() => handleSelectMaskImage(img)}
        >
          <MaskSvg name={img} />
        </Item>
      ))}
      {/* <PlusSquareOutlined /> */}
    </List>
  )
}
