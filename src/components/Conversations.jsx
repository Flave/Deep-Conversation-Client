import React from 'react'
import store from 'App/store'
import Intro from './Intro'
import {getMessage} from 'App/messages'
import Inputs from 'App/components/Inputs';
import Message from 'App/components/Message';
import Typist from 'react-typist'
import { 
  toggleInputs, 
  fetchExchange, 
  uploadImage, 
  advanceConversation, 
  endConversation 
} from 'App/actions'

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
  handleIntroDone() {
    store.dispatch(toggleInputs())
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
      const lastMessage = conversation[mIndex - 1]
      const isMessageGroup = lastMessage && lastMessage.speaker === message.speaker;

      return (
        <Message 
          image={message.image}
          speaker={message.speaker} 
          showName={!isMessageGroup} 
          key={`${mIndex}`} 
          onDone={this.handleNextMessage.bind(this)}>
          {getMessage({...message, id: `${cIndex}-${mIndex}`})}
        </Message>
      )
    })

    return (
      <div key={cIndex} className="conversation">
        {messages}
      </div>
    )
  }
  render() {
    const { conversations, endReached, showInputs } = store.getState()
    const lastConversation = conversations.length ? conversations[conversations.length - 1] : []
    const lastMessage = lastConversation.length ? lastConversation[lastConversation.length - 1] : {}


    return (
      <div style={{minHeight: window.innerHeight}} className="conversations">
        <Intro onDone={this.handleIntroDone} />
        {conversations.map(this.renderConversation)}
        {showInputs && <Inputs />}
      </div>
    )
  }
}