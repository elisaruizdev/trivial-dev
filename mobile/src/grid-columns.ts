import { useWindowDimensions } from 'react-native'

const H_PADDING = 48
const GAP = 8
const COLS = 3

export function useThreeColumnWidth() {
  const { width } = useWindowDimensions()
  return (width - H_PADDING - GAP * (COLS - 1)) / COLS
}
