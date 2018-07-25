import {Fragment} from 'react'
import Container, {Step, Divider} from './styles'
export default ({steps, current = 1}) => (
  <Container>
    {[...Array(steps).keys()].map((step) => (
      <Fragment key={step}>
        <Step active={step + 1 <= current}>{step + 1}</Step>
        {step + 1 < steps && <Divider active={step + 2 <= current} />}
      </Fragment>
    ))}
  </Container>
)
