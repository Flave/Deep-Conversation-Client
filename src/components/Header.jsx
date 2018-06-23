import React from 'react'
import store from 'App/store'
import actions from 'App/actions'

class Header extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }
  handleToggleSpeak() {
    store.dispatch(actions.toggleSpeak())
  }
  render() {
    return (
      <div className="header">
        <span></span>
      </div>
    )
  }
}

export default Header;