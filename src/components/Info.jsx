import React from 'react'
import store from 'App/store'
import {toggleInfo} from 'App/actions'

export default class TypingAnimtion extends React.Component {
  render() {
    return (
      <div className="info">
        <p>Some Info</p>
        <span onClick={() => store.dispatch(toggleInfo())}>Close</span>
      </div>
    )
  }
}