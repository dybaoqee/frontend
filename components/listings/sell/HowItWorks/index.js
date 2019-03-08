import {Component} from 'react'
import Link from 'next/link'
import Carousel from 'nuka-carousel'
import NoSSR from 'react-no-ssr'
import Col from '@emcasa/ui-dom/components/Col'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import {
  Container,
  Content,
  Icon,
  Step,
  StepIndex,
  StepArrow,
  StepContainer,
  Steps,
  Title,
  SubTitle
} from './styles'

const STEPS = [
  {title: 'Avaliação e cadastro <br />online', icon: 'avaliacao-precisa'},
  {title: 'Tour Virtual <br />3D e Fotos Profissionais', icon: 'tour-3d'},
  {title: 'Imóvel Publicado', icon: 'publicacao'},
  {title: 'Visitas Agendadas', icon: 'acesso-compradores'},
  {title: 'Venda<br />Finalizada', icon: 'venda-finalizada'},
]

const getSteps = (isMobile) => {
  const steps = STEPS.map(({title, icon}, index) => (
    <Col width={[1,null,null,  2 / 12]}>
      <StepContainer justifyContent="center">
        <Row justifyContent="center">
          <StepIndex>
            <Text color="white" fontWeight="bold" fontSize="small">
              {index + 1}
            </Text>
          </StepIndex>
          <Step>
            <Icon name={icon} />
            <Text fontSize="medium" color="dark" fontWeight="bold">
              <span dangerouslySetInnerHTML={{__html: title}} />
            </Text>
          </Step>
        </Row>
        {!isMobile && <StepArrow isLast={index === STEPS.length - 1} />}
      </StepContainer>
    </Col>
  ))

  if (isMobile) {
    return (
      <Carousel
        renderCenterLeftControls={() => null}
        renderCenterRightControls={() => null}
        width="300px"
        slidesToShow={1}
        initialSlideHeight={0}
        heightMode="max">
        {steps}
      </Carousel>
    )
  }

  return steps
}

export default class HowItWorks extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Row justifyContent="center">
            <Col>
              <Title fontSize="xlarge" color="dark" fontWeight="bold" textAlign="center">
                Venda seu imóvel em 5 passos
              </Title>
            </Col>
          </Row>
          <Row justifyContent="center">
            <Col width={10 / 12}>
              <SubTitle color="grey" textAlign="center">
                Nosso time de especialistas está preparado para te guiar em cada etapa do processo de venda
                do seu imóvel.
              </SubTitle>
            </Col>
          </Row>
          <Steps justifyContent="center" mt={40}>
            <NoSSR onSSR={getSteps()}>
              {getSteps(this.props.isMobile)}
            </NoSSR>
          </Steps>
          <Row justifyContent="center">
            <Col width={[1,null,null,  4 / 12]}>
              <Link passHref href="/vender/imovel">
                <a>
                  <Button height="tall" fluid>
                    Quero vender meu imóvel
                  </Button>
                </a>
              </Link>
            </Col>
          </Row>
        </Content>
      </Container>
    )
  }
}
