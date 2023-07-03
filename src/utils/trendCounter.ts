export const trendCounter = (oldRate: number, newRate: number) => {
  return parseFloat((100 - (oldRate / newRate) * 100).toFixed(2))
}
