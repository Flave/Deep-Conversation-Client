import store from 'App/store'
import React from 'react'
import {uploadImage, startConversation, fetchExchange} from 'App/actions'

const FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg']

export default class Inputs extends React.Component {
  constructor(props) {
    super(props)
    this.handleTermUpload = this.handleTermUpload.bind(this)
    this.handleImageSelected = this.handleImageSelected.bind(this)
    this.handleTermSelected = this.handleTermSelected.bind(this)
    this.handleTermInputBlur = this.handleTermInputBlur.bind(this)
    this.handleTermInput = this.handleTermInput.bind(this)
    this.handleTermKeyPress = this.handleTermKeyPress.bind(this)
    this.handleClearTermInput = this.handleClearTermInput.bind(this)
    this.state = {
      type: null,
      previewImage: null,
      imageFile: null,
      error: null,
      submitted: false,
      termValue: null,
      animationStep: 3
    }
  }
  componentDidUpdate() {
    if(this.textInput) {
      this.textInput.focus()
    }
  }
  handleTermSelected() {
    this.setState({
      type: 'term',
      previewImage: null,
      imageFile: null,
      error: null
    })
  }
  handleTermInput(e) {
    const value = e.nativeEvent.target.value;
    this.setState({
      termValue: value.length ? value : null,
      error: null
    })
  }
  handleTermKeyPress(e) {
    if(e.keyCode === 13 && this.state.termValue) {
      this.handleTermUpload()
    }
  }
  handleTermInputBlur() {
    if(!this.state.termValue) {
      window.setTimeout(() => {
        this.setState({
          type: null
        })
      }, 100)
    }
  }
  handleImageSelected(selectedEvent) {
    const reader = new FileReader();
    const file = selectedEvent.nativeEvent.target.files[0];
    if(!file) return;
    if(FILE_TYPES.indexOf(file.type) !== -1) {
      reader.onload = (e) => {
        // get loaded data and render thumbnail.
        const formData = new FormData();
        formData.append('startImage', file);
        this.setState({
          submitted: true,
          previewImage: e.target.result
        })
        store.dispatch(startConversation({
          image: e.target.result,
          formData
        }))
        //store.dispatch(uploadImage(formData))
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({
        type: 'image',
        error: 'This only works with PNG or JPG images. Sorry!'
      })
    }
  }
  handleTermUpload() {
    store.dispatch(startConversation({
      query: this.state.termValue
    }))
    // store.dispatch(fetchExchange(this.state.termValue))
    this.setState({submitted: true})
  }
  handleClearTermInput() {
    this.setState({termValue: null})
  }
  renderImageInput() {
    let className = 'btn'
    className += this.state.termValue ? ' is-disabled' : '';
    return (
      <span>
        <input 
          onChange={this.handleImageSelected}
          type="file" 
          name="image"
          value=""
          className="inputs__file-input"
          id="image-upload"/>
        <label 
          className={className} 
          htmlFor={!this.state.termValue ? 'image-upload' : null}>
          Select an image
        </label>
      </span>
    )
  }
  renderTermInput() {
    const value = this.state.termValue;// ? `${this.state.termValue}_` : '_'
    return (
      <span>
        <input 
          className="inputs__text-input"
          onBlur={this.handleTermInputBlur}
          onKeyPress={this.handleTermKeyPress}
          ref={(ref) => this.textInput = ref} 
          onInput={this.handleTermInput}
          value={value === null ? '' : value}
          autoFocus
          type="text"/>
      </span>
    )
  }
  render() {
    const state = this.state;
    if(!state.submitted)
      return (
        <div className="inputs">
          <div className="inputs__controls">
            <span>Either&nbsp;</span>
            {this.renderImageInput()}
            <span>&nbsp;or enter a topic ></span>
            {this.renderTermInput()}
          </div>

          {state.error && <p className="inputs__error">{state.error}</p>}
          
          {(state.termValue || state.previewImage) && 
            <div>
              <button 
                onClick={this.handleTermUpload}
                className="btn">Go!</button>
            </div>
          }
        </div>
      )
    return <div className="inputs" />
  }
}