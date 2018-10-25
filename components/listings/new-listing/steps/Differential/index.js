import React, { Component } from 'react'
import { Formik, Field } from 'formik'

import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import NavButtons from 'components/listings/new-listing/shared/NavButtons'

class Differential extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)
  }

  state = {
    text: null
  }

  componentDidMount() {
    this.updateStateFromProps(this.props)
  }

  componentWillReceiveProps(props) {
    this.updateStateFromProps(props)
  }

  updateStateFromProps(props) {
    const { differential } = props
    if (differential) {
      this.setState({
        text: differential.text
      })
    }
  }

  nextStep() {
    const { navigateTo, updateDifferential } = this.props
    updateDifferential(this.state)
    navigateTo('phone')
  }

  previousStep() {
    const { navigateTo } = this.props
    navigateTo('garage')
  }

  render() {
    const { differential } = this.props
    let text
    if (differential) {
      text = differential.text
    }
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
            <Formik
              initialValues={{
                text: text
              }}
              isInitialValid={() => true}
              render={({isValid, setFieldTouched, setFieldValue, errors}) => (
                <>
                  <View body p={4}>
                    <Text
                      fontSize="large"
                      fontWeight="bold"
                      textAlign="center">
                      Seu imóvel tem algum diferencial?
                    </Text>
                    <Text color="grey">Conte pra gente algum diferencial do seu imóvel.</Text>
                    <Row mb={4}>
                      <Col width={1} mr={4}>
                        <Field
                          name="text"
                          render={({form}) => (
                            <Input
                              area
                              hideLabelView
                              placeholder="Diferenciais do imóvel"
                              defaultValue={text}
                              style={{height: 150}}
                              onChange={(e) => {
                                const { value } = e.target
                                setFieldValue('text', value)
                                setFieldTouched('text')
                                this.setState({text: value})
                              }}
                            />
                          )}/>
                      </Col>
                    </Row>
                  </View>
                  <View bottom p={4}>
                    <NavButtons
                      previousStep={this.previousStep}
                      nextStep={this.nextStep}
                      nextEnabled={isValid}
                    />
                  </View>
                </>
              )}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Differential
