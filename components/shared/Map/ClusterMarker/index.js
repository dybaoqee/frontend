import MarkerCounter from './styles'

export default ({points, onClick}) => (
  <MarkerCounter onClick={onClick && onClick.bind(null, points)}>
    {points.length}
  </MarkerCounter>
)
