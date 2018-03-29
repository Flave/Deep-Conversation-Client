import './style/main.scss'
import './index.html'
import React from 'react'
import ReactDOM from 'react-dom'
import App from 'App/App'

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)

// axios.post('http://localhost:8080/test', {data: {bla: "blablabla"}})
//   .then((res) => {
//     console.log(res)
//   })