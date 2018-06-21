import React from 'react'
import Inputs from './Inputs'
import Message from './Message'
import introMessages from 'App/introMessages'
import {startMessage} from 'App/infoMessages'
import TypingAnimation from 'App/components/TypingAnimation'

const FACTOR = 8;

/*<img className="message__inline-image" src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" />*/

export default class Intro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      started: false,
      done: false,
      step: 0,
      typing: null,
    }

    this.handleDone = this.handleDone.bind(this);
    this.start = this.start.bind(this);
  }
  handleDone() {
    if(this.state.step < introMessages.length) {
      this.setState({
        step: this.state.step + 1,
        typing: null
      })

      if(this.state.step < introMessages.length) {
        const waitingDuration =  Math.random() * 2.5 * FACTOR + 2 * FACTOR;
        window.setTimeout(() => {
          this.setState({
            typing: introMessages[this.state.step].speaker
          })
        }, waitingDuration)
      }
    } else {
      this.setState({done: true});
      this.props.onDone()
    }
  }
  start() {
    this.setState({started: true});
    window.setTimeout(() => {
      this.setState({typing: introMessages[0].speaker});
      window.setTimeout(this.handleDone, 1000);
    }, 700);
  }
  getIntroMessage() {
    return (
      <div>
        <div className="message__meta-content">
          You're about to witness a discussion between two of Google's most advanced algorithms, <a target="_blank" href="https://www.google.de/imghp?tbm=isch">🔍 Google Image Search</a> and <a href="https://cloud.google.com/vision/">👀 Cloud Vision</a> Google's image recognition algorithm. Be prepared. It might get heated. They might use strong language.
        </div>
        <div style={{visibility: this.state.started ? 'hidden' : 'visible'}}>
          <span className="message__start-button" onClick={this.start}>Start</span>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="conversation">
        <Message speaker='INTRO'>
          {this.getIntroMessage()}
        </Message>
        {introMessages.slice(0, this.state.step).map((message, i) => {
          const isLast = i === introMessages.length - 1;
          const typingDuration = isLast ? 0 : Math.random() * 3 * FACTOR + 4 * FACTOR;
          return (
            <Message 
              durationUntilNext={typingDuration}
              onDone={this.handleDone}
              key={i} 
              showName={true} 
              speaker={message.speaker} 
            >
              {message.content}
            </Message>
          )
        })}
        {this.state.typing && <TypingAnimation speaker={this.state.typing} />}
        {this.state.done &&
          <Message speaker='HINT'>
            {startMessage}
          </Message>
        }
      </div>
    )
  }
}