import React from 'react'
import ReactDOM from 'react-dom'
import Buttons from './video_buttons.js'
import ListItem from './video_list_item.js'

const app = document.querySelector('#root')

class FormApp extends React.Component {
  constructor () {
    super()

    this.state = {
      inputValue: '',
      videoData: undefined,
      tokenData: undefined,
      itemStatus: false,
      id: undefined
    }

    this.loadVideo = this.loadVideo.bind(this)
    this.nextToken = this.nextToken.bind(this)
    this.updateKeyword = this.updateKeyword.bind(this)
    this.keyword = this.keyword.bind(this)
  }

  updateKeyword (e) {
	    this.setState({
	      inputValue: e.target.value
	    })
  }

  keyword (e) {
    if (e.keyCode === 13 && this.state.inputValue !== '') {
      fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.state.inputValue}&type=video&key=AIzaSyBSoKMX-NlPdtRGGal-_p8yxR2SrA66_ks`)
		    .then((response) => {
      return response.json()
    })
        .then((data) => {
          this.setState({
            videoData: data,
            itemStatus: true,
            id: undefined
          })
        })
    }
  }

  loadVideo (e) {
    if (e.target.tagName === 'IMG' || e.target.className === 'title-description') {
      this.setState({
        id: parseFloat(e.currentTarget.id)
      })
    }
  }

  nextToken (btn) {
    const resultToken = this.state.tokenData !== undefined && !this.state.itemStatus ? this.state.tokenData[`${btn}`] : this.state.videoData[`${btn}`]

    fetch(`https://www.googleapis.com/youtube/v3/search?pageToken=${resultToken}&part=snippet&q=${this.state.inputValue}&type=video&key=AIzaSyBSoKMX-NlPdtRGGal-_p8yxR2SrA66_ks`)
		  .then((response) => {
    return response.json()
  })
      .then((data) => {
        this.setState({
          tokenData: data,
          itemStatus: false,
          id: undefined
        })
      })
  }

  render () {
    let listItem = null
    let buttons = null

    if (this.state.videoData !== undefined) {
      if (this.state.tokenData !== undefined && !this.state.itemStatus) {
        listItem = <ListItem idVideo={this.state.id} loadVideo={this.loadVideo} data={this.state.tokenData} />
      } else {
        listItem = <ListItem idVideo={this.state.id} loadVideo={this.loadVideo} data={this.state.videoData} />
      }

      buttons = <Buttons currentData={this.state.tokenData !== undefined && !this.state.itemStatus ? this.state.tokenData : false} nextToken={this.nextToken} />
    }

    return (
      <div className='wrapper-app'>
        <div className='react-app'>
          <div className='react-app__top'>
            <header className='react-app__header'>
              <h2 className='react-app__title'>Search <span className='text-color'>Videos</span></h2>
            </header>
            <input value={this.state.inputValue} onChange={this.updateKeyword} onKeyDown={this.keyword} type='text' className='search' placeholder='Search YouTube' />
            <div className='titles-box'>
              <p className='react-app_subtitle'>Search amazing videos for free</p>
              <p className='react-app_subtitle'>Search amazing videos for free</p>
            </div>
          </div>
          <ul className='videos'>
            {listItem}
            {buttons}
          </ul>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<FormApp />, app)
