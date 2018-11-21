import {Component} from 'react'
import theme from '@emcasa/ui'
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
  min-width: 1100px;
`

const Icon = styled.div`
  background-image: url('/static/svg-icons/${props => props.name}.svg');
  background-repeat: no-repeat;
  background-size: cover;
  width: 50px;
  height: 50px;
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
  {title: 'Avaliação precisa do seu imóvel', icon: 'avaliacao-precisa'},
  {title: 'Tour Virtual 3D e Fotos Profissionais', icon: 'tour-3d'},
  {title: 'Imóvel Publicado', icon: 'publicacao'},
  {title: 'Visitas Agendadas', icon: 'acesso-compradores'},
  {title: 'Venda Finalizada', icon: 'venda-finalizada'},
]

export default class HowItWorks extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Row justifyContent="center">
            <Col>
              <Text fontSize="xlarge" color="dark" fontWeight="bold">
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
            {STEPS.map(({title, icon}, index) => (
              <Col width={2 / 12}>
                <StepIndex>
                  <Text color="white" fontWeight="bold" fontSize="small">
                    {index + 1}
                  </Text>
                </StepIndex>
                <Step>
                  <Icon name={icon} />
                  <Text fontSize="medium" color="dark" fontWeight="bold">
                    {title}
                  </Text>
                </Step>
              </Col>
            ))}
          </Steps>
          <Row justifyContent="center">
            <Col width={4 / 12}>
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
