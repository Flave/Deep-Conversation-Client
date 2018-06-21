import React from 'react'
import Message from './Message'
import {restartMessages} from 'App/infoMessages'

export default ({lastMessage}) => (
  <Message speaker='HINT'>
    {restartMessages(lastMessage)}
  </Message>
)