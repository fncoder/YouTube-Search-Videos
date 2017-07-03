import React from 'react'

class EmbedVideo extends React.Component {
  render () {
    return (
      <iframe id='player' src={`http://www.youtube.com/embed/${this.props.videoId}`} />
    )
  }
}

export default EmbedVideo
