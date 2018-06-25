import React from 'react'
import Inputs from './Inputs'
import Message from './Message'
import introMessages from 'App/introMessages'
import {startMessage} from 'App/infoMessages'
import TypingAnimation from 'App/components/TypingAnimation'

/*<img className="message__inline-image" src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" />*/

export default class Intro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      done: false,
      step: 0,
      typing: null,
      skip: false
    }

    this.handleDone = this.handleDone.bind(this);
    this.handleProbablyRead = this.handleProbablyRead.bind(this);
    this.skipIntro = this.skipIntro.bind(this);
    this.start = this.start.bind(this);
  }
  handleDone() {
    if(this.state.step < introMessages.length) {
      this.setState({
        step: this.state.step + 1,
        typing: null
      })
    } else {
      this.setState({done: true});
      this.props.onDone()
    }
  }
  handleProbablyRead() {
    if(this.state.step < introMessages.length) {
      this.setState({
        typing: introMessages[this.state.step].speaker
      })
    }
  }
  start() {
    this.props.onStart()
    window.setTimeout(() => {
      this.setState({typing: introMessages[0].speaker});
      window.setTimeout(this.handleDone, 1000);
    }, 400);
  }
  skipIntro() {
    this.setState({
      skip: true,
      done: true,
      typing: null,
      step: introMessages.length
    })
    this.props.onStart();
    this.props.onDone();
  }
  getIntroMessage() {
    return (
      <div className={this.props.started ? 'is-hidden' : ''}>
        <div className="message__meta-content">
          You're about to witness a discussion between two of Google's most advanced algorithms, <a target="_blank" href="https://www.google.de/imghp?tbm=isch">🔍 Google Image Search</a> and <a href="https://cloud.google.com/vision/">👀 Cloud Vision</a> (Google's image recognition service). Be prepared. It might get heated. They might use strong language.
        </div>
        <div>
          <span className="message__start-button" onClick={this.start}>Start</span>
          {this.getSkipButton()}
        </div>
      </div>
    )
  }
  getSkipButton() {
    return <span className="message__skip-button" onClick={this.skipIntro}>Skip Intro</span>
  }
  render() {
    const {step, typing, done, skip} = this.state;
    const {started, speak} = this.props;

    return (
      <div className="conversation">
        <Message speaker='INTRO'>
          {started ? this.getSkipButton() : this.getIntroMessage()}
        </Message>
        {introMessages.slice(0, step).map((message, i) => {
          return (
            <Message
              speak={!skip && speak}
              onDone={this.handleDone}
              onProbablyRead={this.handleProbablyRead}
              key={i} 
              showName={true} 
              speaker={message.speaker} 
            >
              {message.content}
            </Message>
          )
        })}
        {typing && <TypingAnimation speaker={typing} />}
        {done &&
          <Message speaker='HINT'>
            {startMessage}
          </Message>
        }
      </div>
    )
  }
}