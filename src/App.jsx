import React from 'react'
import store from './store'
import Conversations from './components/Conversations'
import Header from './components/Header'
import Info from './components/Info'

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
    const {showInfo} = store.getState();
    return (
      <div className="app-container">
        <Header />
        <Conversations />
        {showInfo && <Info />}
      </div>
    )
  }
}

export default App;