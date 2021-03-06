import _find from 'lodash/find';
import {CAN_SPEAK} from './constants';

// {
//   query: searchterm,
//   image: url,
//   labels: []
// }

const initialState = {
  conversations: [],
  buffer: [],
  endReached: true,
  showInputs: false,
  typing: null,
  speak: CAN_SPEAK,
  started: false,
  showInfo: false
}

function receiveExchange(state, {data}) {
  let conversation = state.conversations.pop(state.conversations.length - 1)
  // check if this is the first exchange to be returned, if so 
  // it does not have labels

  if(data.error) {
    const lastMessage = conversation.pop(conversation.length - 1);
    const conversations = [
      ...state.conversations,
      [ 
        ...conversation,
        {
          ...lastMessage,
          step: data.error,
          ended: true
        }
      ]
    ]
    return {
      ...state,
      conversations,
      endReached: true,
      typing: null
    };
  }

  const label = data.labels[0];
  const isLooping = _find(conversation, {label})

  if(data.query) {
    conversation.push({
      image: data.image,
      query: data.query,
      speaker: 'SEARCH',
      step: conversation.length > 1 ? 'CONVERSATION' : 'START'
    })

    let step = isLooping ? 'LOOP' : 'CONVERSATION'
    step = (label.toLowerCase() === data.query.toLowerCase()) ? 'END' : step

    state.buffer = [{
      label,
      labels: data.labels,
      query: data.query,
      speaker: 'VISION',
      step
    }]

    if(isLooping)
      state.buffer = [
        ...state.buffer,
        {
          label,
          labels: data.labels,
          query: data.query,
          speaker: 'SEARCH',
          step: 'LOOP'
        }
      ]
  } else {
    conversation.push({
      label,
      labels: data.labels,
      speaker: 'VISION',
      step: 'START'
    })
  }

  const conversations = [
    ...state.conversations,
    conversation
  ]
  return {
    ...state,
    conversations,
    typing: null
  };
}

function startConversation(state, {data}) {
  const speaker = data.query ? 'SEARCH' : 'VISION';
  const conversations = [...state.conversations, [{
    ...data,
    step: 'PRE_START',
    speaker
  }]]

  return {
    ...state,
    conversations,
    showInputs: false,
    endReached: false,
    typing: null
  };
}

function advanceConversation(state) {
  const currentConversation = state.conversations.pop();
  const nextMessage = state.buffer.shift()

  const conversations = [
    ...state.conversations,
    [
      ...currentConversation,
      nextMessage
    ]
  ]
  const buffer = [...state.buffer]
  return {
    ...state,
    conversations,
    buffer,
    typing: null
  };
}

function endConversation(state) {
  const lastConversation = state.conversations.pop(state.conversations.length - 1);
  const lastMessage = lastConversation.pop(lastConversation.lengt - 1);

  return {
    ...state,
    showInputs: true,
    conversations: [...state.conversations, [...lastConversation, {...lastMessage, ended: true}]],
    endReached: true, 
    typing: null
  }
}

function toggleInputs(state, {data}) {
  const explicit = data !== undefined;
  return {
    ...state, 
    showInputs: explicit ? data : !state.showInputs
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
  case 'RECEIVE_EXCHANGE':
    return receiveExchange(state, action)
  case 'START_CONVERSATION':
    return startConversation(state, action)
  case 'ADVANCE_CONVERSATION':
    return advanceConversation(state)
  case 'TOGGLE_INPUTS':
    return toggleInputs(state, action)
  case 'TOGGLE_SPEAK':
    return {...state, speak: !state.speak}
  case 'TOGGLE_INFO':
    return {...state, showInfo: !state.showInfo}
  case 'START_TYPING':
    return {...state, typing: action.data}
  case 'START':
    return {...state, started: true}
  case 'END_CONVERSATION':
    return endConversation(state)
  default:
    return state;
  }
}