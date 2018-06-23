import React from 'react'

// export default ({speaker}) => (
//   <div className={`typing typing--${speaker}`}>
//     <span className="typing-bubble typing-bubble--1"/>
//     <span className="typing-bubble typing-bubble--2"/>
//     <span className="typing-bubble typing-bubble--3"/>
//   </div>
// )

const chars = ['—', '\\',  '|', '/'];

export default class TypingAnimtion extends React.Component {
  constructor(props) {
    super(props);
    this.nextStep = this.nextStep.bind(this);
    this.state = {
      index: 0
    }
  }
  nextStep() {
    this.setState({index: this.state.index + 1});
    const delay = this.state.index % 4 === 3 ? 600 : 100;
    this.timeout = window.setTimeout(this.nextStep, delay);
  }
  componentDidMount() {
    this.nextStep();
  }
  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }
  render() {
    const {speaker} = this.props;
    let dots = '';
    for(let i=0; i<this.state.index % 4; i++) {
      dots += '. ';
    }
    return (
      <div className={`typing typing--${speaker}`}>
        {dots}
      </div>
    )
  }
}