import React from 'react'

export default class Conversation extends React.Component {
  componentDidMount() {
    window.setTimeout(() => {
      this.props.onNext()
    }, 3000)
  }
  render() {
    return (
      <div className="message__text">
        {this.props.children}
      </div>
    )
  }
}