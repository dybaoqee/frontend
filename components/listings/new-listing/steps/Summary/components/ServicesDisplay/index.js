import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Text from '@emcasa/ui-dom/components/Text'

const TOUR_TEXT = 'o Tour Virtual'
const PICTURES_TEXT = 'as Fotos'

class ServicesDisplay extends PureComponent {
  render() {
    const { wantsTour, wantsPictures } = this.props.services
    const { day, time } = this.props.tour
    const date = moment(day).format('DD/MM/YYYY')

    if (wantsTour && wantsPictures) {
      return (
        <>
          <Text color="grey">Seu melhor horário para {TOUR_TEXT} e {PICTURES_TEXT}:</Text>
          <Text fontSize="large" fontWeight="bold" textAlign="center">{date}<br />às {time}h</Text>
          <Text color="grey">Nossos agentes entrarão em contato com você para confirmar o dia e horário da visita.</Text>
        </>
      )
    }
    
    return (
      <>
        <Text color="grey">Seu melhor horário para {wantsTour && TOUR_TEXT}{wantsPictures && PICTURES_TEXT}:</Text>
        <Text fontSize="large" fontWeight="bold" textAlign="center">{date}<br />às {time}h</Text>
        <Text color="grey">Nossos agentes entrarão em contato com você para confirmar o dia e horário da visita.</Text>
      </>
    )
  }
}

ServicesDisplay.propTypes = {
  wantsTour: PropTypes.bool,
  wantsPictures: PropTypes.bool,
  day: PropTypes.string,
  time: PropTypes.string
}

export default ServicesDisplay
