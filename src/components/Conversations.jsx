import React from 'react'
import store from 'App/store'
import Intro from './Intro'
import {getMessage} from 'App/messages'
import Inputs from 'App/components/Inputs';
import Message from 'App/components/Message';
import RestartMessage from 'App/components/RestartMessage';
import TypingAnimation from 'App/components/TypingAnimation';
import { 
  toggleInputs, 
  fetchExchange, 
  uploadImage, 
  advanceConversation, 
  endConversation,
  startTyping,
  start
} from 'App/actions'

const FACTOR = 1000;

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
  handleStart() {
    store.dispatch(start());
  }
  handleIntroDone() {
    store.dispatch(toggleInputs(true))
  }
  handleNextMessage() {
    const { conversations, speaker, conversationStep, endReached } = store.getState();
    const currentConversation = conversations[conversations.length - 1];
    const lastMessage = currentConversation[currentConversation.length - 1];
    // if is first message after input, check if exchange needs to 
    // be fetched or image needs to be uploaded
    if(lastMessage.step === 'PRE_START') {
      if(lastMessage.speaker === 'VISION') {
        store.dispatch(uploadImage(lastMessage.formData))
      }
      else {
        store.dispatch(fetchExchange(lastMessage.query))
      }
    // if end was reached don't send any further requests
    } else if (lastMessage.step === 'END') {
      store.dispatch(endConversation());
    } else if (lastMessage.step === 'LOOP') {
      if(lastMessage.speaker === 'VISION') {
        store.dispatch(advanceConversation());
      } else {
        store.dispatch(endConversation());
      }
    // else, just continue the conversation, unless it has been ended
    } else {
      if(lastMessage.speaker === 'VISION') {
        !endReached && store.dispatch(fetchExchange(lastMessage.label))
      }
      else {
        store.dispatch(advanceConversation());
      }
    }
  }
  startTyping() {
    const { conversations, endReached } = store.getState();
    const currentConversation = conversations[conversations.length - 1];
    const lastMessage = currentConversation[currentConversation.length - 1];
    let nextSpeaker = lastMessage.speaker === 'VISION' ? 'SEARCH' : 'VISION';

    if(lastMessage.step === 'END' || endReached) return;
    if(lastMessage.step === 'PRE_START')
      nextSpeaker = lastMessage.speaker
    store.dispatch(startTyping(nextSpeaker))
  }
  renderConversation(conversation, cIndex) {
    const { typing, speak, conversations, endReached } = store.getState();
    const isLastConversation = cIndex === conversations.length - 1;
    const lastMessage = conversation[conversation.length - 1];

    const messages = conversation.map((message, mIndex) => {
      const previousMessage = conversation[mIndex - 1];
      const isMessageGroup = previousMessage && previousMessage.speaker === message.speaker;
      const isLastMessage = message.step === 'LOOP' || message.step === 'END';
      const doType = message.step !== 'LOOP';

      return (
        <Message
          speak={speak}
          onDone={this.handleNextMessage.bind(this)}
          onProbablyRead={doType && this.startTyping}
          image={message.image}
          speaker={message.speaker}
          showName={!isMessageGroup}
          isGroup={isMessageGroup}
          key={`${mIndex}`}>
          {getMessage({...message, id: `${cIndex}-${mIndex}`, stepIndex: mIndex - 2})}
        </Message>
      )
    })

    return (
      <div key={cIndex} className="conversation">
        {messages}
        {(typing && isLastConversation) && <TypingAnimation speaker={typing} />}
        {lastMessage.ended && <RestartMessage lastMessage={lastMessage} />}
      </div>
    )
  }
  render() {
    const { speak, started, conversations, endReached, showInputs } = store.getState()
    let className = 'conversations';
    className += showInputs ? ' has-inputs' : '';

    return (
      <div style={{minHeight: window.innerHeight}} className={className}>
        <Intro 
          started={started} 
          speak={speak} 
          onStart={this.handleStart}
          onDone={this.handleIntroDone} />
        {conversations.map(this.renderConversation)}
        {showInputs && <Inputs />}
      </div>
    )
  }
}