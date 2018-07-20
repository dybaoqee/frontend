import Container, {Step} from './styles'
export default ({steps, current = 1, titles}) => (
  <Container>
    {[...Array(steps).keys()].map((step) => (
      <Step current={step + 1 === current} key={step}>
        {step + 1}
      </Step>
    ))}
  </Container>
)
