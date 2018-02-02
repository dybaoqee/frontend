import {Component} from 'react'
import MediaQuery from 'react-responsive'

export default class Matterport extends Component {
  render() {
    const {matterport_code} = this.props
    const src = `https://my.matterport.com/show/?m=${matterport_code}`

    return (
      <div>
        {matterport_code &&
          <MediaQuery query="(max-width: 600px)">
            <iframe width='100%' height='200' src={src} frameBorder='0' allowFullScreen />
          </MediaQuery>
        }

        {matterport_code &&
          <MediaQuery query="(min-width: 601px)">
            <iframe width='100%' height='480' src={src} frameBorder='0' allowFullScreen />
          </MediaQuery>
        }
      </div>
    )
  }
}
