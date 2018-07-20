import {Component} from 'react'
import Slider from 'components/shared/Common/Slider'
import NumberFormat from 'react-number-format'
import Container, {
  SliderContainer,
  Description,
  InfoContainer,
  Info,
  Table,
  DescriptionColumn,
  Column,
  Buttons
} from './styles'
import Link from 'next/link'
import EmCasaButton from 'components/shared/Common/Buttons'
import ContactButton from 'components/shared/Common/Contact'
import Stepper from 'components/shared/Common/Stepper'

export default class PriceEstimate extends Component {
  state = {
    listingValue: 400,
    used: false
  }
  sliderChanged = ({maxValue}, userClicked) => {
    const {used} = this.state
    this.setState({listingValue: maxValue, used: userClicked})

    if (!used && userClicked) {
      window.dataLayer.push({
        action: 'User used calculator',
        event: 'user_used_calculator'
      })
    }
  }

  getSellerEconomy = () => {
    const {listingValue} = this.state
    return Math.round(1.2 / 100 * listingValue + 3400)
  }

  getBuyerEconomy = () => {
    const {listingValue} = this.state
    return Math.round(0.8 / 100 * listingValue + 2400)
  }
  render() {
    const {listingValue} = this.state
    return (
      <Container>
        <h3>Quer saber quanto vale seu imóvel?</h3>
        <Stepper steps={3} current={1} />

        <Buttons>
          <ContactButton />
        </Buttons>
      </Container>
    )
  }
}
