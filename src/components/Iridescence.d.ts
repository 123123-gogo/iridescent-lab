declare module './components/Iridescence' {
  import { FC } from 'react'
  interface IridescenceProps {
    color?: [number, number, number]
    speed?: number
    amplitude?: number
    mouseReact?: boolean
    [key: string]: unknown
  }
  const Iridescence: FC<IridescenceProps>
  export default Iridescence
}
