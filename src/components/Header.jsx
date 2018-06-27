import React from 'react'
import store from 'App/store'
import {CAN_SPEAK} from 'App/constants';
import {toggleSpeak, toggleInfo} from 'App/actions'

class Header extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }
  handleToggleSpeak() {
    store.dispatch(toggleSpeak())
  }
  handleToggleInfo() {
    store.dispatch(toggleInfo())
  }
  render() {
    const {speak, started} = store.getState();

    if(!started) return null;

    return (
      <div className="header">
        <span onClick={this.handleToggleInfo} className="header__item">info</span>{CAN_SPEAK && '/'}
        {CAN_SPEAK && <span onClick={this.handleToggleSpeak} className="header__item">{speak ? 'mute' : 'unmute'}</span>}
      </div>
    )
  }
}

export default Header;