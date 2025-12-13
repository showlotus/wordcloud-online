import { theme } from 'antd'

import { cn } from '@/lib/utils'

export interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean
  children: React.ReactNode
  onClick?: () => void
}

export const Block = ({
  isActive,
  children,
  onClick,
  ...props
}: BlockProps) => {
  const { token } = theme.useToken()

  return (
    <div
      className={cn(
        `p-1.5 w-10 h-10 flex items-center justify-center transition-all duration-300 ease cursor-pointer border border-solid hover:border-black ${
          isActive ? 'border-black' : ''
        }`
      )}
      style={{
        borderRadius: token.borderRadius,
        boxShadow: isActive ? '0 0 0 2px rgba(0, 0, 0, 0.1)' : 'initial'
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}
