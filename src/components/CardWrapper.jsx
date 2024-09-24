export default function (props) {
  const { header, align } = props
  return (
    <div className="card">
      <div
        className="card-header"
        style={{ textAlign: align, fontWeight: '600' }}
      >
        <h5>{header?.name ?? ''}</h5>
        <span className="text-muted">{header?.detail ?? ''}</span>
      </div>
      <div className="card-block">{props.children}</div>
    </div>
  )
}
