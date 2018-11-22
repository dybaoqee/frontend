import {Component} from 'react'
import theme from '@emcasa/ui'
import Link from 'next/link'
import styled from 'styled-components'
import Carousel from 'nuka-carousel'
import NoSSR from 'react-no-ssr'
import View from '@emcasa/ui-dom/components/View'
import Col from '@emcasa/ui-dom/components/Col'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import {isMobile} from 'components/listings/new-listing/lib/mobile'

const Container = styled(View)`
  display: flex;
  justify-content: center;
`

const Content = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1100px;
  @media (max-width: ${theme.breakpoints[0]}) {
    padding-left: 20px;
    padding-right: 20px;
  }
`

const Icon = styled.div`
  background-image: url('/static/svg-icons/${props => props.name}.svg');
  background-repeat: no-repeat;
  background-size: cover;
  width: 70px;
  height: 70px;
`

const Step = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  border: 1px solid ${theme.colors.lightGrey};
  border-radius: 4px;
  width: 120px;
  height: 164px;
  padding: 5px;
  p {
    margin: 0;
  }
  @media (max-width: ${theme.breakpoints[0]}) {
    margin-top: 28px;
    margin-bottom: 60px;
  }
`

const StepIndex = styled.div`
  margin: -10px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: 28px;
  border-radius: 100%;
  background-color: ${theme.colors.pink};
`


const Steps = styled(Row)`
  min-height: 30vh;
  
`

const STEPS = [
  {title: 'Cadastro do Imóvel', icon: 'cadastro-imovel'},
  {title: 'Avaliação precisa do<br />seu imóvel', icon: 'avaliacao-precisa'},
  {title: 'Tour Virtual <br />3D e Fotos Profissionais', icon: 'tour-3d'},
  {title: 'Imóvel Publicado', icon: 'publicacao'},
  {title: 'Visitas Agendadas', icon: 'acesso-compradores'},
  {title: 'Venda<br />Finalizada', icon: 'venda-finalizada'},
]

const getSteps = (ignoreMobile) => {
  const steps = STEPS.map(({title, icon}, index) => (
    <Col width={[1, 2 / 12]}>
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
    </Col>
  ))

  if (!ignoreMobile && isMobile()) {
    return (
      <Carousel
        renderCenterLeftControls={() => null}
        renderCenterRightControls={() => null}
        width="400px"
        slidesToShow={2}
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
              <Text fontSize="xlarge" color="dark" fontWeight="bold" textAlign="center">
                100% de Satisfação Garantida
              </Text>
            </Col>
          </Row>
          <Row justifyContent="center">
            <Col width={10 / 12}>
              <Text color="grey" textAlign="center">
                A EmCasa tem um processo único. É muito fácil vender seu imóvel
                aqui. Simplificamos todo o processo e proporcionamos uma
                economia pra você.
              </Text>
            </Col>
          </Row>
          <Steps justifyContent="center" mt={40}>
            <NoSSR onSSR={getSteps(true)}>
              {getSteps()}
            </NoSSR>
          </Steps>
          <Row justifyContent="center">
            <Col width={[1, 4 / 12]}>
              <Link href="/vender/imovel">
                <Button height="tall" fluid>
                  Quero vender meu imóvel
                </Button>
              </Link>
            </Col>
          </Row>
        </Content>
      </Container>
    )
  }
}
