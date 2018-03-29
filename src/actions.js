import {ajax} from 'jquery'


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

export const endConversation = () => ({
  type: 'END_CONVERSATION'
})

export const uploadImage = (data) => ajax({
  url: 'http://localhost:8080/upload',
  type: 'POST',
  data,
  cache: false,
  dataType: 'json',
  processData: false,
  contentType: false
})
  .then((response) => receiveExchange(response))

export const fetchExchange = (term) => ajax({
  url: `http://localhost:8080/term?q=${term}`,
  type: 'GET',
  dataType: 'json',
  processData: false,
  contentType: false
})
  .then((response) => receiveExchange(response))