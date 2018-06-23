import React from 'react'
import store from './store'
import Conversations from './components/Conversations'
import Header from './components/Header'

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
        <Header />
        <Conversations />
      </div>
    )
  }
}

export default App;