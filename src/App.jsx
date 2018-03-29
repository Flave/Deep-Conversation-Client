import React from 'react'
import store from './store'
import Conversations from './components/Conversations'
import {endConversation} from './actions'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  render() {
    return (
      <div className="app-container">        
        <Conversations />
      </div>
    )
  }
}

export default App;