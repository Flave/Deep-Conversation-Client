import React from 'react'
import Inputs from './Inputs'

export default class Intro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1
    }
  }
  renderStart() {
    return (
      <div className="intro-step">
        <p>You’re about to whitness a conversation between two of the most advanced computer algorithms.</p>
        <p>Give them something to talk about</p>
      </div>
    )
  }
  renderRestart() {
    return (
      <div className="intro-step">
        <p>Looks like they came to an agreement after all...</p>
        <p>Wanna go again?</p>
      </div>
    )
  }
  render() {
    const { restarting } = this.props;
    return (
      <div className="intro">
        {restarting ? this.renderRestart() : this.renderStart()}
        {this.state.step === 1 && <Inputs />}
      </div>
    )
  }
}