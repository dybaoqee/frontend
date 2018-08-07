import Container, {Title, Description} from './styles'
import EmCasaButton from 'components/shared/Common/Buttons'
import Link from 'next/link'

export default () => (
  <Container>
    <Title>Ops, ainda não atuamos nesta região</Title>
    <Description>
      <p>
        A nossa primeira regra é prestar um atendimento excepcional para nossos
        clientes, para isso expandimos nossa operação um bairro por vez e
        infelizmente ainda não chegamos nesta região, por isso não conseguimos
        estimar o valor deste imóvel no momento. <br /> <br /> Conhece alguém
        vendendo um imóvel na zona sul do Rio de Janeiro?
      </p>
    </Description>
  </Container>
)
