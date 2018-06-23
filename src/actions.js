import {ajax} from 'jquery'

// eslint-disable-next-line no-undef
const server = process.env.NODE_ENV === 'production' ? 
  'https://smartiez.uber.space/server' : 
  'http://localhost:8080';


const receiveExchange = (data) => ({
  type: 'RECEIVE_EXCHANGE',
  data
});

export const startConversation = (data) => ({
  type: 'START_CONVERSATION',
  data
})

export const advanceConversation = () => ({
  type: 'ADVANCE_CONVERSATION'
})

export const toggleInputs = () => ({
  type: 'TOGGLE_INPUTS'
})

export const toggleSpeak = () => ({
  type: 'TOGGLE_SPEAK'
})

export const startTyping = (data) => ({
  type: 'START_TYPING',
  data
})

export const endConversation = () => ({
  type: 'END_CONVERSATION'
})

export const uploadImage = (data) => ajax({
  url: `${server}/upload`,
  type: 'POST',
  data,
  cache: false,
  dataType: 'json',
  processData: false,
  contentType: false
})
  .then((response) => receiveExchange(response))

export const fetchExchange = (term) => ajax({
  url: `${server}/term?q=${term}`,
  type: 'GET',
  dataType: 'json',
  processData: false,
  contentType: false
})
  .then((response) => receiveExchange(response))