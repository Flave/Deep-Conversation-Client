import React, { Fragment } from 'react';
import { capitalize } from 'App/utils';
import { timer } from 'd3';

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
    const typingDuration = this.props.duration || 3000;
    const waitingDuration = Math.random() * 2 * FACTOR + 3 * FACTOR;

    if(this.props.image) {
      window.setTimeout(() => {
        this.setState({renderImage: true})
      }, 2000)      
    }
    window.setTimeout(() => {
      this.props.onDone && this.props.onDone()
    }, typingDuration)

    window.setTimeout(() => {
      this.props.onProbablyRead && this.props.onProbablyRead()
    }, waitingDuration)
  }
  render() {
    const { speaker, image, children, showName } = this.props;

    return (
      <Fragment>
        <div className={`message message--${speaker}`}>
          {showName && <div className="message__sender-name">{capitalize(speaker)}</div>}
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