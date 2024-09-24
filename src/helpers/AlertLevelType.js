export default function AlertLevelType(data) {
  if (data == '3') {
    return (
      <div
        style={{ backgroundColor: '#F9584B', color: 'white', padding: '2px' }}
      >
        Cao
      </div>
    )
  } else if (data == '2') {
    return (
      <div
        style={{ backgroundColor: '#FFD12B', color: 'white', padding: '2px' }}
      >
        Trung Bình
      </div>
    )
  } else {
    return (
      <div
        style={{
          backgroundColor: 'rgb(207, 196, 188)',
          color: 'white',
          padding: '2px',
        }}
      >
        Thấp
      </div>
    )
  }
}
