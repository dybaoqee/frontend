import React, {Component} from 'react'
import {PoseGroup} from 'react-pose'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import Icon from '@emcasa/ui-dom/components/Icon'
import Row from '@emcasa/ui-dom/components/Row'
import ArrowButton from 'components/shared/ArrowButton'
import FadeInOut from 'components/shared/Animation/FadeInOut'

const TIME = 6000

const INSTRUCTIONS = [
  {
    title: '1. Contato com o especialista',
    description: 'No primeiro contato, conversamos para entender o que você está procurando.'
  },
  {
    title: '2. Lista exclusiva de imóveis',
    description: 'Separamos e enviamos alguns links de imóveis com base no seu perfil.'
  },
  {
    title: '3. Agendar visitas',
    description: 'Você confere todos pelo Tour Virtual 3D e agenda as visitas nos preferidos.'
  }
]

class InstructionText extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    intervalId: null,
    textDisplay: 0
  }

  componentDidMount() {
    const intervalId = setInterval(this.switchText, TIME)
    this.setState({intervalId})
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  switchText = (previous) => {
    const {textDisplay} = this.state
    let newTextDisplay = previous ? textDisplay - 1 : textDisplay + 1
    if (newTextDisplay === -1) {
      newTextDisplay = INSTRUCTIONS.length - 1
    } else if (newTextDisplay === INSTRUCTIONS.length) {
      newTextDisplay = 0
    }
    this.setState({textDisplay: newTextDisplay})
  }

  render() {
    return (
      <View m={4} style={{position: 'relative', height: 140}}>
        <ArrowButton left color={theme.colors.extraDarkSmoke} noShadow onClick={() => {
          clearInterval(this.state.intervalId)
          this.switchText(true)
        }} />
        <ArrowButton right color={theme.colors.extraDarkSmoke} noShadow onClick={() => {
          clearInterval(this.state.intervalId)
          this.switchText()
        }} />
        <PoseGroup>
          {INSTRUCTIONS.map((item, index) => {
            if (this.state.textDisplay === index) {
              return (
                <FadeInOut key={index}>
                  <Row justifyContent="center" alignItems="center" flexDirection="column" mx="40px" style={{height: 120}}>
                    <Text fontSize="small" textAlign="center" fontWeight="bold">{INSTRUCTIONS[this.state.textDisplay].title}</Text>
                    <Text fontSize="small" textAlign="center">{INSTRUCTIONS[this.state.textDisplay].description}</Text>
                  </Row>
                </FadeInOut>
              )
            }
          })}
        </PoseGroup>
        <Row width="30px" justifyContent="space-between" m="auto">
          {INSTRUCTIONS.map((item, index) => {
            const active = this.state.textDisplay === index
            return (
              <Icon
                key={index}
                name="circle"
                color={active ? theme.colors.blue : theme.colors.extraDarkSmoke}
                size={active ? 10 : 6}
                style={{marginTop: active ? 0 : 2}}
              />
            )
          })}
        </Row>
      </View>
    )
  }
}

export default InstructionText
