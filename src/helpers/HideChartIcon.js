export default function HideChart() {
  let listChartHide = document.querySelectorAll('g[aria-labelledby]')
  for (let index = 0; index < listChartHide.length; index++) {
    listChartHide[index].style.display = 'none'
  }
}
