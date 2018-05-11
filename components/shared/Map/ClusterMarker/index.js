import MarkerCounter from './styles'

export default ({points, onClick, highlight}) => (
  <MarkerCounter
    onClick={onClick && onClick.bind(null, points)}
    highlight={highlight}
  >
    <span>{points.length}</span>
  </MarkerCounter>
)
