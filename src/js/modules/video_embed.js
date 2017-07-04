import React from 'react'

class EmbedVideo extends React.Component {
  render () {
    return (
      <iframe id='player' src={`https://www.youtube.com/embed/${this.props.videoId}`} />
    )
  }
}

export default EmbedVideo
