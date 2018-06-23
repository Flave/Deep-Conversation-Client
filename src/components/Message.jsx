import React, { Fragment } from 'react';
import { timer } from 'd3-timer';
import { capitalize } from 'App/utils';
import {SpeechSynth} from './speechSynth';

let speechSynth = SpeechSynth();

const FACTOR = 400;

export default class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderImage: false,
      imageLoading: true
    }
    this.handleImageLoad = this.handleImageLoad.bind(this);
  }
  scrollToBottom() {
    const totalHeight = document.body.clientHeight;
    window.scrollTo(0, totalHeight);    
  }
  handleImageLoad() {
    this.scrollToBottom();
    this.setState({imageLoading: false})
  }
  componentDidUpdate() {
    this.scrollToBottom()
  }
  componentDidMount() {
    const {speak, speaker } = this.props;

    // Proceed with speaking
    if(speak) {
      const textContent = this.messageEl.textContent;
      const speechText = textContent.replace(/(🙈|🙊|😂|🤓|😤|🙃|😛|🤔|😄|🙄|😩|👀|❤|🙄)/g, '')

      speechSynth.utter(speechText, speaker, () => {
        this.props.onProbablyRead && this.props.onProbablyRead()
        window.setTimeout(() => {
          this.props.onDone && this.props.onDone()
        }, FACTOR * 1.5);
        if(this.props.image) {
          window.setTimeout(() => {
            this.setState({renderImage: true})
          }, FACTOR * 2.5);
        }
      })
    // Proceed without speaking
    } else {
      window.setTimeout(() => {
        this.props.onProbablyRead && this.props.onProbablyRead()  
      }, FACTOR * 2);
      
      window.setTimeout(() => {
        this.props.onDone && this.props.onDone()
      }, FACTOR * 3.5);

      if(this.props.image) {
        window.setTimeout(() => {
          this.setState({renderImage: true})
        }, FACTOR * 4.5);
      }
    }
  }
  render() {
    const { speaker, type, image, children, showName } = this.props;
    const speakerIcon = speaker === 'VISION' ? '👀' : '🔍';
    const speakerName = `${speakerIcon} ${capitalize(speaker)}`;
    
    return (
      <Fragment>
        <div className={`message message--${speaker}`}>
          {showName && <div className="message__sender-name">{speakerName}</div>}
          <div ref={ref => this.messageEl = ref} className="message__content">
            {children}
          </div>
        </div>
        {
          (image && this.state.renderImage) && 
          <div className={`message--${speaker} message__image-container ${this.state.imageLoading && 'message__image-container--is-loading'}`}>
            <img onLoad={this.handleImageLoad} className="message__image" src={image} />
            <a className="message__image-url" target="_blank" href={image}>{image}</a>
          </div>
        }
      </Fragment>
    )
  }
}