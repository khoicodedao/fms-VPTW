export default function AddIdToArray(arr) {
  return arr.map((el, index) => {
    return { ...el, index: index + 1 }
  })
}
