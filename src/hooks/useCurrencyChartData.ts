export const commonSettings = {
  fill: true,
  tension: 0.1,
  borderColor: '#6359e9',
  pointBackgroundColor: 'rgb(140, 137, 180)',
  backgroundColor: (context: any) => {
    const chart = context.chart
    const { ctx, chartArea } = chart
    if (!chartArea) return null

    const gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    )
    gradient.addColorStop(0, 'transparent')
    gradient.addColorStop(1, '#6359e9')

    return gradient
  },
}

export const useCurrencyChartData = (
  data: Array<number>,
  labels: Array<string>,
  currentCurrencyCode: string
) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        ...commonSettings,
        label: currentCurrencyCode,
        data: data,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      enabled: true,
    },
    scales: {
      y: {
        ticks: {
          color: 'rgb(140, 137, 180)',
        },
      },
      x: {
        ticks: {
          color: 'rgb(140, 137, 180)',
        },
      },
    },
    elements: {
      point: {
        radius: 3,
        hitRadius: 10,
      },
    },
  }

  return { chartData, chartOptions }
}
