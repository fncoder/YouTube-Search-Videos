import React from 'react'

class Buttons extends React.Component {
  render () {
    let checkToken = this.props.currentData.hasOwnProperty('prevPageToken')
    let btnPrev = null

    if (checkToken) {
      btnPrev = <button onClick={() => this.props.nextToken('prevPageToken')} className='btn next-rev'>Prev</button>
    } else {
      btnPrev = null
    }
    return (
      <div className='btn-controls'>
        {btnPrev}
        <button onClick={() => this.props.nextToken('nextPageToken')} className='btn next-btn'>Next</button>
      </div>
    )
  }
}

export default Buttons
