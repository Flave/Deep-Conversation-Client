import React from 'react'
import Inputs from './Inputs'
import Message from './Message'
import introMessages from 'App/introMessages'

export default class Intro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1
    }
    this.handleDone = this.handleDone.bind(this)
  }
  handleDone() {
    if(this.state.step < introMessages.length) {
      this.setState({step: this.state.step + 1})
    } else {
      this.props.onDone()
    }
  }
  render() {
    return (
      <div className="conversation">
        {introMessages.slice(0, this.state.step).map((message, i) => {
          return (
            <Message key={i} showName={true} speaker={message.speaker} onDone={this.handleDone}>
              {message.content}
            </Message>
          )
        })}
      </div>
    )
  }
}