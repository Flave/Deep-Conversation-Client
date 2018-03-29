import _find from 'lodash/find';

// {
//   query: searchterm,
//   image: url,
//   labels: []
// }

const initialState = {
  conversations: [],
  buffer: [],
  endReached: true,
  showInputs: false
}

function receiveExchange(state, {data}) {
  let conversation = state.conversations.pop(state.conversations.length - 1)
  // check if this is the first exchange to be returned, if so 
  // it does not have labels

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
    step = (label === data.query) ? 'END' : step

    state.buffer = [{
      label,
      query: data.query,
      speaker: 'VISION',
      step
    }]

    if(isLooping)
      state.buffer = [
        ...state.buffer,
        {
          label,
          query: data.query,
          speaker: 'SEARCH',
          step: 'LOOP'
        }
      ]
  } else {
    conversation.push({
      label,
      speaker: 'VISION',
      step: 'START'
    })
  }

  state.conversations = [
    ...state.conversations,
    conversation
  ]
  return state;
}

function startConversation(state, {data}) {
  const conversations = [...state.conversations, [{
    ...data,
    step: 'PRE_START',
    speaker: data.query ? 'SEARCH' : 'VISION'
  }]]

  return {
    ...state,
    conversations,
    endReached: false
  };
}

function advanceConversation(state) {
  const currentConversation = state.conversations.pop();
  const nextMessage = state.buffer.shift()

  state.conversations = [
    ...state.conversations,
    [
      ...currentConversation,
      nextMessage
    ]
  ]
  state.buffer = [...state.buffer]
  return state;
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
    return {...state, showInputs: !state.showInputs}
  case 'END_CONVERSATION':
    return {...state, endReached: true}
  default:
    return state;
  }
}