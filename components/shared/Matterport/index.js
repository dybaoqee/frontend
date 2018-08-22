import React from 'react'
import Container, {Poster} from './styles'

export default class Matterport extends React.Component {
  state = {
    opened: false
  }

  handleTour = () => {
    this.setState({opened: true})
  }

  render() {
    const {code} = this.props
    const {opened} = this.state

    return (
      <Container>
        {opened ? (
          <iframe
            width="100%"
            height="480"
            src={`https://my.matterport.com/show/?m=${code}&play=1`}
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <Poster onClick={this.handleTour} />
        )}
      </Container>
    )
  }
}
