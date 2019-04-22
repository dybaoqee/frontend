import DevelopmentPhases from 'constants/developmentPhases'
import Container, {Phase} from './styles'

const PHASES = Array.from(DevelopmentPhases)
PHASES.reverse().pop()

export default function DevelopmentPhaseBar({phase}) {
  let isActive = false
  return (
    <Container>
      {PHASES.map(([value, label]) => {
        isActive = isActive || value == phase
        return (
          <Phase active={isActive}>
            {label}
          </Phase>
        )
      })}
    </Container>
  )
}
