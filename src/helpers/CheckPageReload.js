export default function CheckPageReload(callback) {
  if (window.performance) {
    if (performance.navigation.type == 1) {
      callback()
    } else {
      console.log("Page doesn't reload")
    }
  }
}
