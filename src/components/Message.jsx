import React, { Fragment } from 'react';
import { timer } from 'd3-timer';
import { capitalize } from 'App/utils';

const FACTOR = 2000;

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
    let durationUntilNext = this.props.durationUntilNext || 4000;
    let durationUntilRead = this.props.durationUntilRead || 3000;

    if(this.props.image) {
      durationUntilNext += 1000;
      durationUntilRead += 1000;
    }

    if(this.props.image) {
      window.setTimeout(() => {
        this.setState({renderImage: true})
      }, 1000)      
    }
    window.setTimeout(() => {
      this.props.onDone && this.props.onDone()
    }, durationUntilNext)

    window.setTimeout(() => {
      this.props.onProbablyRead && this.props.onProbablyRead()
    }, durationUntilRead)
  }
  render() {
    const { speaker, type, image, children, showName } = this.props;
    const speakerIcon = speaker === 'VISION' ? '👀' : '🔍';
    const speakerName = `${speakerIcon} ${capitalize(speaker)}`;
    
    return (
      <Fragment>
        <div className={`message message--${speaker}`}>
          {showName && <div className="message__sender-name">{speakerName}</div>}
          <div className="message__content">
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