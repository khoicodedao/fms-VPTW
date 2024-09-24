export default function flattenObject(obj, parentKey = "") {
  let result = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof obj[key] === "object" && obj[key] !== null) {
        // Đối tượng con, tiếp tục đệ quy
        const flattenedChild = flattenObject(obj[key], newKey);
        result = { ...result, ...flattenedChild };
      } else {
        // Không phải là đối tượng con, đưa vào đối tượng kết quả
        result[newKey] = obj[key];
      }
    }
  }

  return result;
}
