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
  Icon,
  Title,
  SubTitle,
  BenefitCol,
  VideoContainer
} from './styles'

export default class Benefits extends Component {

  getBenefits = (isMobile, showTour) => {
    const benefits = this.props.benefitsList.map(({icon, title, description}) => (
      <BenefitCol width={[1,null,null,  3 / 12]} key={title}>
        {icon && <Icon name={icon} />}
        <SubTitle fontSize="large" fontWeight="normal" color="dark">
          {title}
        </SubTitle>
        <Text color="gray">{description}</Text>
      </BenefitCol>
    ))

    if (isMobile && !showTour) {
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
    const {sectionTitle, buttonHref, buttonLabel, buttonClick, isMobile, showTour} = this.props

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
          {showTour &&
            <Row justifyContent="center">
              <VideoContainer>
                <video
                  style={{width: "100%"}}
                  src="https://s3.amazonaws.com/emcasa-ui/videos/tour-compressed.mp4"
                  type="video/mp4"
                  loop="loop"
                  muted="muted"
                  autoplay="autoplay"
                  playsInline="playsinline">
                </video>
              </VideoContainer>
            </Row>
          }
          <Row
            mt={2}
            justifyContent="center"
            flexDirection={['column', null, null, 'row']}
            alignItems={['center', null, null, 'flex-start']}
          >
            <NoSSR onSSR={this.getBenefits()}>
              {this.getBenefits(isMobile, showTour)}
            </NoSSR>
          </Row>
          {!showTour && <Row justifyContent="center">
            <Col width={[1,null,null,  4 / 12]}>
              <Link passHref href={buttonHref}>
                <a>
                  <Button height="tall" fluid onClick={buttonClick}>
                    {buttonLabel}
                  </Button>
                </a>
              </Link>
            </Col>
          </Row>}
        </Content>
      </Container>
    )
  }
}
