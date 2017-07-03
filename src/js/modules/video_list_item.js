import React from 'react'
import EmbedVideo from './video_embed.js'

class ListItem extends React.Component {
  render () {
    const dataItem = this.props.data.items

    return (
      <div className='videos-list'>
        {this.props.data.items.map((item, index) => {
          return <li className='video-item' id={index} key={index} onClick={(e) => this.props.loadVideo(e)}>
            <div className='video-content'>
              <div className='yt-icon'>
                <img src={dataItem[index].snippet.thumbnails.default.url} />
              </div>
              <div className='yt-description'>
                <p className='title-description'>{dataItem[index].snippet.title}</p>
                <p className='channel-title'>{dataItem[index].snippet.channelTitle}</p>
                <p className='video-description'>{dataItem[index].snippet.description}</p>
              </div>
            </div>
            <div className='embed-video'>
              {index === this.props.idVideo ? <EmbedVideo videoId={item.id.videoId} /> : false}
            </div>
          </li>
        })}
      </div>
    )
  }
}

export default ListItem
