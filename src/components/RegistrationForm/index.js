// Write your JS code here
import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    isFormSubmitted: false,
    isFirstNameError: false,
    isLastNameError: false,
  }

  onBlurLastName = () => {
    const isValidLastName = this.validateLastName()
    this.setState({isLastNameError: !isValidLastName})
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validateFirstName()
    this.setState({isFirstNameError: !isValidFirstName})
  }

  validateLastName = () => {
    const {lastName} = this.state
    return lastName !== ''
  }

  validateFirstName = () => {
    const {firstName} = this.state
    return firstName !== ''
  }

  submitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.validateFirstName()
    const isValidLastName = this.validateLastName()

    if (isValidFirstName && isValidLastName) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        isFirstNameError: !isValidFirstName,
        isLastNameError: !isValidLastName,
        isFormSubmitted: false,
      })
    }
  }

  onChangeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  renderRegistrationForm = () => {
    const {firstName, lastName, isFirstNameError, isLastNameError} = this.state

    const className = isFirstNameError ? 'name-field error-field' : 'name-field'
    const className2 = isLastNameError ? 'name-field error-field' : 'name-field'

    return (
      <form className="form-container" onSubmit={this.submitForm}>
        <div className="input-container">
          <label htmlFor="firstName" className="label">
            FIRST NAME
          </label>
          <input
            id="firstName"
            type="text"
            className={className}
            value={firstName}
            placeholder="First name"
            onChange={this.onChangeFirstName}
            onBlur={this.onBlurFirstName}
          />
          {isFirstNameError && <p className="err-msg">Required</p>}
        </div>
        <div className="input-container">
          <label htmlFor="lastName" className="label">
            LAST NAME
          </label>
          <input
            id="lastName"
            type="text"
            className={className2}
            value={lastName}
            placeholder="Last name"
            onChange={this.onChangeLastName}
            onBlur={this.onBlurLastName}
          />
          {isLastNameError && <p className="err-msg">Required</p>}
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    )
  }

  onClickSuccessBtn = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      firstName: '',
      lastName: '',
    }))
  }

  renderSubmissionSuccessView = () => (
    <div className="success-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-image"
      />
      <p className="text">Submitted Successfully</p>
      <button
        type="button"
        onClick={this.onClickSuccessBtn}
        className="submit-btn"
      >
        Submit Another Response
      </button>
    </div>
  )

  render() {
    const {isFormSubmitted} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading"> Registration</h1>
        <div className="view-container">
          {isFormSubmitted
            ? this.renderSubmissionSuccessView()
            : this.renderRegistrationForm()}
        </div>
      </div>
    )
  }
}
export default RegistrationForm
