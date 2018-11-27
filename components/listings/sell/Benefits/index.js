import {Component} from 'react'
import theme from '@emcasa/ui'
import Carousel from 'nuka-carousel'
import NoSSR from 'react-no-ssr'
import Link from 'next/link'
import styled from 'styled-components'
import View from '@emcasa/ui-dom/components/View'
import Col from '@emcasa/ui-dom/components/Col'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'

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
  margin-bottom: 30px;
`

const BenefitCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  p {
    margin-bottom: 8px;
    margin-top: 0;
  }
  @media (max-width: ${theme.breakpoints[0]}) {
    padding-bottom: 50px;
  }
`

const BENEFITS = [
  {
    icon: 'tour-3d',
    title: 'Tour Virtual 3D',
    description:
      'Atraia mais compradores interessados no seu imóvel com Tour 3D'
  },
  {
    icon: 'avaliacao-precisa',
    title: 'Avaliação online',
    description:
      'Nossa avaliação online é precisa de acordo com os valores de mercado da sua região'
  },
  {
    icon: 'assistencia-juridica',
    title: 'Sem dor de cabeça',
    description:
      'Aqui na EmCasa cuidamos de toda burocracia, contratos e documentação'
  }
]

const getBenefits = (isMobile) => {
  const benefits = BENEFITS.map(({icon, title, description}) => (
    <BenefitCol width={[1, 3 / 12]}>
      <Icon name={icon} />
      <Text fontSize="large" color="dark">
        {title}
      </Text>
      <Text color="gray">{description}</Text>
    </BenefitCol>
  ))

  if (isMobile) {
    return (
      <Carousel
        renderCenterLeftControls={() => null}
        renderCenterRightControls={() => null}
        width="300px"
        initialSlideHeight={0}
        heightMode="max">
        {benefits}
      </Carousel>
    )
  }

  return benefits
}

export default class Benefits extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Row justifyContent="center">
            <Col>
              <Text fontSize="large" color="dark" fontWeight="bold" textAlign="center">
                Conheça as vantagens de vender com a EmCasa
              </Text>
            </Col>
          </Row>
          <Row
            justifyContent="center"
            flexDirection={['column', 'row']}
            alignItems={['center', 'none']}
          >
            <NoSSR onSSR={getBenefits()}>
              {getBenefits(this.props.isMobile)}
            </NoSSR>
          </Row>
          <Row justifyContent="center">
            <Col width={[1, 4 / 12]}>
              <Link href="/vender/imovel">
                <Button height="tall" fluid>
                  Conheça mais a EmCasa
                </Button>
              </Link>
            </Col>
          </Row>
        </Content>
      </Container>
    )
  }
}
