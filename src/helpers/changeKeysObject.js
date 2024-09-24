function changeKeys(object, keyMapper) {
  if (typeof object !== 'object' || object === null) {
    return object
  }

  const updatedObject = Array.isArray(object) ? [] : {}

  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key]
      const newKey = keyMapper[key] ? keyMapper[key] : key

      updatedObject[newKey] = changeKeys(value, keyMapper)
    }
  }

  return updatedObject
}
export default changeKeys
