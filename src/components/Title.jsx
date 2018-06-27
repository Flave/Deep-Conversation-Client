import React from 'react'

export default class Intro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      done: false
    }
    this.animate = this.animate.bind(this);
  }
  componentDidMount() {
    this.animate();
  }
  animate() {
    this.setState({step: this.state.step + 1});
    //if(this.state.step < 16)
    window.setTimeout(this.animate, 80);
    // else
    //   this.setState({done: true});
  }
  renderWord(word, start=0) {
    const {step, done} = this.state;
    const offset = step % 16;

    return word.split('').map((letter, i) => {
      const index = 16 - (i + start) + offset;
      const angle = (index % 16) / 16 * Math.PI * 2;
      return (
        <span 
          style={{
            opacity: (Math.random() * .4 + Math.sin(angle) * .6) * .3 + .7
          }}
          key={i}
          className="intro__title-letter">
          {letter}
        </span>
      )
    })
  }
  render() {
    return (
      <div className="intro__title">
        <svg version="1.1" id="Ebene_1" width="800" height="150">
          <defs>
            <filter id="filter">
              {/*COLORS*/}
              <feFlood floodColor="#333" result="COLOR-red"></feFlood>
              {/*COLORS END*/}


              {/*STROKE*/}
              <feMorphology operator="dilate" radius="4" in="SourceAlpha" result="STROKE_10"></feMorphology>
              {/*STROKE END*/}

              {/*EXTRUDED BEVEL*/}
              <feConvolveMatrix order="8,8" divisor="1" kernelMatrix="1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1" in="STROKE_10" result="BEVEL_20"></feConvolveMatrix>

              <feOffset dx="8" dy="8" in="BEVEL_20" result="BEVEL_25"></feOffset>
              <feComposite operator="out" in="BEVEL_25" in2="STROKE_10" result="BEVEL_30"></feComposite>
              <feComposite in="COLOR-red" in2="BEVEL_30" operator="in" result="BEVEL_40"></feComposite>
              <feMerge result="BEVEL_50">
                <feMergeNode in="BEVEL_40"></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
              </feMerge>
              {/*EXTRUDED BEVEL END*/}

              <feComposite in2="FRACTAL-TEXTURE_20" in="BEVEL_50" operator="in"></feComposite>
            </filter>
          </defs>
        </svg>
        <div className="intro__title-text">
          <div className="intro__title-word">{this.renderWord('Deep')}</div>
          <div className="intro__title-word">{this.renderWord('Conversation', 4)}</div>
        </div>
      </div>
    )
  }
}