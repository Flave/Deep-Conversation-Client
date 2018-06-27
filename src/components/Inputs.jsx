import store from 'App/store'
import React, { Fragment } from 'react'
import {startConversation} from 'App/actions'

const FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg']
const exampleTerms = [
  'Backstreet Boys', 
  'Climate Change', 
  'Dust', 
  'Plywood', 
  'Magic Mushrooms', 
  'Deep Dream', 
  'Neurology',
  'Romance', 
  'Sundar Pichai', 
  'Larry Page', 
  'Sergey Brin',
  'Artificiallity',
  'Code',
  'CD Rom',
  'Facial Cream'
]

const getExampleTerm = () => {
  return exampleTerms.splice(Math.floor(Math.random() * exampleTerms.length), 1);
}

const examplePlaceholder = `E.g. ${getExampleTerm()}, ${getExampleTerm()}…`;

export default class Inputs extends React.Component {
  constructor(props) {
    super(props)
    this.handleTermUpload = this.handleTermUpload.bind(this)
    this.handleImageSelected = this.handleImageSelected.bind(this)
    this.handleTermSelected = this.handleTermSelected.bind(this)
    this.handleTermInput = this.handleTermInput.bind(this)
    this.handleTermKeyPress = this.handleTermKeyPress.bind(this)
    this.handleClearTermInput = this.handleClearTermInput.bind(this)
    this.state = {
      previewImage: null,
      imageFile: null,
      error: null,
      submitted: false,
      termValue: null,
    }
  }
  componentDidMount() {
    if(this.textInput) {
      this.textInput.focus();
    }
  }
  componentDidUpdate() {
    if(this.props.disabled) {
      this.textInput.blur();
    } else {
      this.textInput.focus();
    }
  }
  handleTermSelected() {
    this.setState({
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
    if(e.nativeEvent.keyCode === 13 && this.state.termValue) {
      this.handleTermUpload()
    }
  }
  handleImageSelected(selectedEvent) {
    const reader = new FileReader();
    const file = selectedEvent.nativeEvent.target.files[0];
    if(!file) return;

    if(FILE_TYPES.indexOf(file.type) === -1) {
      this.setState({
        type: 'image',
        error: 'This only works with PNG or JPG images. Sorry!'
      })
    } else if(file.size > 3000000) {
      this.setState({
        type: 'image',
        error: `${Math.floor(file.size / 1000000)}Mb is a lot. Can you maybe try again with a smaller (< 3Mb) version of the image?`
      })
    } else {
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
      };
      reader.readAsDataURL(file);
    }
  }
  handleTermUpload() {
    store.dispatch(startConversation({
      query: this.state.termValue
    }));

    this.setState({
      submitted: true, 
      error: null,
      termValue: null
    });
  }
  handleClearTermInput() {
    this.setState({termValue: null})
  }
  renderImageInput() {
    const state = this.state;
    let className = 'input__btn'
    className += this.state.termValue ? ' is-disabled' : '';
    return (
      <Fragment>
        <input 
          onChange={this.handleImageSelected}
          type="file" 
          name="image"
          accept=".png,.jpg,.jpeg"
          value=""
          className="input__file-input"
          id="image-upload"/>
        <label 
          className={className} 
          htmlFor={!this.state.termValue ? 'image-upload' : null}>
          Upload an image
        </label>
        {state.error && <p className="input__error">{state.error}</p>}
      </Fragment>
    )
  }
  renderTermInput() {
    const value = this.state.termValue;// ? `${this.state.termValue}_` : '_'
    return (
      <Fragment>
        <input
          className="input__text-input"
          onKeyPress={this.handleTermKeyPress}
          ref={(ref) => this.textInput = ref} 
          onInput={this.handleTermInput}
          value={value === null ? '' : value}
          placeholder={examplePlaceholder}
          type="text"/>
        {this.state.termValue && <span 
          onClick={this.handleTermUpload} 
          className="input__term-submit">Send</span>}
      </Fragment>
    )
  }
  render() {
    const {disabled} = this.props;

    return (
      <div className={`inputs ${disabled ? 'is-disabled' : ''}`}>
        <div className="input input--term">
          {this.renderTermInput()}
        </div>
        <div className="input input--image">
          {this.renderImageInput()}
        </div>
      </div>
    )
  }
}