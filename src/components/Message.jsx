import React, { Fragment } from 'react';
import { capitalize } from 'App/utils';

export default class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderImage: false
    }
  }
  componentDidUpdate() {
    const totalHeight = document.body.clientHeight;
    window.scrollTo(0, totalHeight);
  }
  componentDidMount() {
    if(this.props.image) {
      window.setTimeout(() => {
        this.setState({renderImage: true})
      }, 1500)      
    }
    window.setTimeout(() => {
      this.props.onDone && this.props.onDone()
    }, 300)
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
          <div className={`message message--${speaker} message--image`}>
            <img className="message__image" src={image} />
          </div>
        }
      </Fragment>
    )
  }
}