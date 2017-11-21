import React from 'react'
import MediaQuery from 'react-responsive'

class Matterport extends React.Component {
  render() {
    const { listing } = this.props

    return (
      <div>
        {listing.matterport_code &&
          <MediaQuery query="(max-width: 600px)">
            <iframe width='100%' height='200' src={`https://my.matterport.com/show/?m=${listing.matterport_code}`} frameBorder='0' allowFullScreen></iframe>
          </MediaQuery>
        }
        {listing.matterport_code &&
          <MediaQuery query="(min-width: 601px)">
            <iframe width='100%' height='480' src={`https://my.matterport.com/show/?m=${listing.matterport_code}`} frameBorder='0' allowFullScreen></iframe>
          </MediaQuery>
        }

        <style jsx>{`
          iframe {
            margin-bottom: 40px;
          }
        `}</style>
      </div>
    )
  }
}

export default Matterport
