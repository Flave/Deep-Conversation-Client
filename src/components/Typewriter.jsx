import React from 'react'
import {interval as d3Interval} from 'd3-timer'

export default class Typewriter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 1
    }
  }
  componentDidMount() {
    const interval = d3Interval(() => {
      if(this.props.text.length > this.props.text.length) {
        interval.stop()
      } else {
        this.setState({
          currentIndex: this.state.currentIndex + 1
        })
      }
    }, 50)
  }
  render() {
    return (
      <span className="typewriter">
        {this.props.text.slice(0, this.state.currentIndex)}
      </span>
    )
  }
}