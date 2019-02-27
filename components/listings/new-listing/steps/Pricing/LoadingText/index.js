import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { PoseGroup } from 'react-pose'
import { FadeLoader } from 'react-spinners'
import theme from '@emcasa/ui'
import Text from '@emcasa/ui-dom/components/Text'
import Row from '@emcasa/ui-dom/components/Row'
import FadeInOut from 'components/shared/Animation/FadeInOut'
import { randomKey } from 'lib/random'

const TIME_PER_SENTENCE = 3000

class LoadingText extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSentence: 0
    }
    this.swapSentence = this.swapSentence.bind(this)
    this.sentenceTimer = null
  }

  componentDidMount() {
    this.sentenceTimer = setInterval(this.swapSentence, TIME_PER_SENTENCE)
  }

  componentWillUnmount() {
    clearInterval(this.sentenceTimer)
  }

  swapSentence() {
    const { sentences } = this.props
    let nextSentence = ++this.state.currentSentence
    if (nextSentence >= sentences.length) {
      nextSentence = 0
    }
    this.setState({ currentSentence: nextSentence})
  }

  render() {
    const { sentences } = this.props
    return (
      <>
        <PoseGroup>
          {sentences.map((sentence, index) => {
            if (this.state.currentSentence === index) {
              return (
                <FadeInOut key={randomKey()}>
                  <Row width={1} justifyContent="center">
                    <Text key={index}>{sentence}</Text>
                  </Row>
                </FadeInOut>
              )
            }
          })}
        </PoseGroup>
        <Row mt={4} flexDirection="column" alignItems="center" width={1}>
          <FadeLoader
            width={10}
            height={10}
            margin={2}
            radius={8}
            color={theme.colors.pink}
          />
        </Row>
      </>
    )
  }
}

LoadingText.propTypes = {
  sentences: PropTypes.array.isRequired
}

export default LoadingText
