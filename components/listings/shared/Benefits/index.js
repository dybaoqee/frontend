import {Component} from 'react'
import Carousel from 'nuka-carousel'
import NoSSR from 'react-no-ssr'
import Link from 'next/link'
import Col from '@emcasa/ui-dom/components/Col'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import {
  Container,
  Content,
  Title,
  SubTitle,
  Icon,
  BenefitCol
} from './styles'

export default class Benefits extends Component {

  getBenefits = (isMobile) => {
    const benefits = this.props.benefitsList.map(({icon, title, description}, index) => (
      <BenefitCol width={[1, 3 / 12]} key={index}>
        <Icon name={icon} />
        <SubTitle fontSize="large" fontWeight="normal" color="dark">
          {title}
        </SubTitle>
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

  render() {
    const {sectionTitle, buttonHref, buttonLabel, buttonClick, isMobile} = this.props

    return (
      <Container>
        <Content>
          <Row justifyContent="center">
            <Col>
              <Title fontSize="large" color="dark" fontWeight="bold" textAlign="center">
                {sectionTitle}
              </Title>
            </Col>
          </Row>
          <Row
            justifyContent="center"
            flexDirection={['column', 'row']}
            alignItems={['center', 'none']}
          >
            <NoSSR onSSR={this.getBenefits()}>
              {this.getBenefits(isMobile)}
            </NoSSR>
          </Row>
          <Row justifyContent="center">
            <Col width={[1, 4 / 12]}>
              <Link passHref href={buttonHref}>
                <a>
                  <Button height="tall" fluid onClick={buttonClick}>
                    {buttonLabel}
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
