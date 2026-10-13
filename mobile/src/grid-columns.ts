import { useWindowDimensions } from 'react-native'

const H_PADDING = 48
const GAP = 8

export function useColumnWidth(cols: number) {
  const { width } = useWindowDimensions()
  return (width - H_PADDING - GAP * (cols - 1)) / cols
}
