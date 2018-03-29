import React from 'react'
import store from 'App/store'
import Intro from './Intro'
import {getMessage} from 'App/messages'
import Message from './Message'
import Typist from 'react-typist'
import { fetchExchange, uploadImage, advanceConversation, endConversation } from 'App/actions'

const SearchAvatar = ({spell}) => (
  <div className="message__sender-name">{spell && 'Search '}</div>
)

const VisionAvatar = ({spell}) => (
  <div className="message__sender-name">{spell && 'Vision '}</div>
)

export default class Conversation extends React.Component {
  constructor(props) {
    super(props)
    this.renderConversation = this.renderConversation.bind(this)
  }
  componentDidUpdate() {
    const totalHeight = document.body.clientHeight;
    window.scrollTo(0, totalHeight);
  }
  handleNextMessage() {
    const { conversations, speaker, conversationStep, endReached } = store.getState();
    const currentConversation = conversations[conversations.length - 1];
    let lastMessage = currentConversation[currentConversation.length - 1];

    if(lastMessage.step === 'PRE_START') {
      if(lastMessage.speaker === 'VISION')
        store.dispatch(uploadImage(lastMessage.formData))
      else
        store.dispatch(fetchExchange(lastMessage.query))
    } else if (lastMessage.step === 'END') {
      store.dispatch(endConversation());
    } else if (lastMessage.step === 'LOOP') {
      if(lastMessage.speaker === 'VISION') {
        store.dispatch(advanceConversation());
      } else {
        store.dispatch(endConversation());
      }
    } else {
      if(lastMessage.speaker === 'VISION')
        !endReached && store.dispatch(fetchExchange(lastMessage.label))
      else
        store.dispatch(advanceConversation())
    }
  }
  renderConversation(conversation, cIndex) {
    const messages = conversation.map((message, mIndex) => {
      // Hacky way to find out whether the image should be shown or not
      const showImage = mIndex !== (conversation.length - 1) && mIndex !== 0;
      const lastMessage = conversation[mIndex - 1]
      const isMessageGroup = lastMessage && lastMessage.speaker === message.speaker;
      let className = 'message';
      className += isMessageGroup ? ' message--group' : '';
      className += ` message--${message.speaker}`;

      return (
        <div key={`${mIndex}`} className={className}>
          {message.speaker === 'VISION' ? 
            <VisionAvatar spell={!isMessageGroup} /> : 
            <SearchAvatar spell={!isMessageGroup} />
          }
          <div className="message__content">
            <Message onNext={this.handleNextMessage.bind(this)}>
              {getMessage({...message, id: `${cIndex}-${mIndex}`})}
            </Message>
          </div>
          {/*create component that only shows up after certain amount of time for image*/}
          {(message.image && showImage) &&
              <div className="message__content message__content--image">
                <div 
                  className="conversation__image"
                  style={{
                    backgroundImage: `url("${message.image}")`
                  }}
                />
              </div>
          }
        </div>
      )
    })

    return (
      <div key={cIndex} className="conversation">
        {conversation[0].image && 
            <div 
              className="conversation__image"
              style={{
                backgroundImage: `url(${conversation[0].image})`
              }}
            />}
        {conversation[0].query && <p>{conversation[0].query}</p>}
        {messages}
      </div>
    )
  }
  render() {
    const { conversations, endReached } = store.getState()
    const lastConversation = conversations.length ? conversations[conversations.length - 1] : []
    const lastMessage = lastConversation.length ? lastConversation[lastConversation.length - 1] : {}

    return (
      <div style={{minHeight: window.innerHeight}} className="conversations">
        <div className="conversations__inner">
          {conversations.map(this.renderConversation)}
          {endReached && <Intro looped={lastMessage.type === 'LOOP'} restarting={conversations.length} />}
        </div>
      </div>
    )
  }
}