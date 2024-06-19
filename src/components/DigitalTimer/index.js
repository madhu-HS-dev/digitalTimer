// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimeRunning: false,
    timeElapsedInMinutes: 25,
    timeElapsedInSeconds: 0,
  }

  onResetTimer = () => {
    this.clearIntervalTimer()
    this.setState({
      isTimeRunning: false,
      timeElapsedInMinutes: 25,
      timeElapsedInSeconds: 0,
    })
  }

  clearIntervalTimer = () => {
    clearInterval(this.intervalId)
  }

  incrementElapsedTime = () => {
    const {timeElapsedInMinutes, timeElapsedInSeconds} = this.state
    const isTimeCompleted = timeElapsedInSeconds === timeElapsedInMinutes * 60

    if (isTimeCompleted) {
      this.clearIntervalTimer()
      this.setState({isTimeRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({
      timeElapsedInMinutes: prevState.timeElapsedInMinutes + 1,
    }))
  }

  onDecrement = () => {
    const {timeElapsedInMinutes} = this.state
    if (timeElapsedInMinutes > 1) {
      this.setState(prevState => ({
        timeElapsedInMinutes: prevState.timeElapsedInMinutes - 1,
      }))
    }
  }

  onToggleStart = () => {
    const {
      isTimeRunning,
      timeElapsedInSeconds,
      timeElapsedInMinutes,
    } = this.state
    const isTimeCompleted = timeElapsedInSeconds === timeElapsedInMinutes * 60

    if (isTimeCompleted) {
      this.setState({
        timeElapsedInSeconds: 0,
      })
    }

    if (isTimeRunning) {
      this.clearIntervalTimer()
    } else {
      this.intervalId = setInterval(this.incrementElapsedTime, 1000)
    }

    this.setState(prevState => ({
      isTimeRunning: !prevState.isTimeRunning,
    }))
  }

  getElapsedTimeAndSeconds = () => {
    const {timeElapsedInMinutes, timeElapsedInSeconds} = this.state
    const totalSecondsRemaining =
      timeElapsedInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalSecondsRemaining / 60)
    const seconds = Math.floor(totalSecondsRemaining % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {
      isTimeRunning,
      timeElapsedInSeconds,
      timeElapsedInMinutes,
    } = this.state
    const imageToDisplay = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const alt = isTimeRunning ? 'pause icon' : 'play icon'

    const textToDisplay = isTimeRunning ? 'Pause' : 'Start'
    const labelText = isTimeRunning ? 'Running' : 'Paused'

    const limitValue = timeElapsedInMinutes

    const isButtonDisabled = timeElapsedInSeconds > 0

    return (
      <div className="digital-timer-container">
        <h1 className="digital-timer">Digital Timer</h1>
        <div className="timer-button-container">
          <div className="timer-bg-container">
            <div className="timer-container">
              <h1 className="timer25">{this.getElapsedTimeAndSeconds()}</h1>
              <p className="paused">{labelText}</p>
            </div>
          </div>
          <div className="button-container">
            <div className="start-reset-container">
              <div className="start-container start-margin">
                <button
                  type="button"
                  className="btn"
                  onClick={this.onToggleStart}
                >
                  <img src={imageToDisplay} alt={alt} className="play-image" />
                  <h1 className="start">{textToDisplay}</h1>
                </button>
              </div>
              <div className="start-container">
                <button
                  type="button"
                  className="btn"
                  onClick={this.onResetTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="play-image"
                  />
                  <h1 className="start">Reset</h1>
                </button>
              </div>
            </div>
            <p className="set-timer-limit">Set Timer Limit</p>
            <div className="limit-container">
              <button
                type="button"
                className="on-decrement"
                onClick={this.onDecrement}
                disabled={isButtonDisabled}
              >
                -
              </button>
              <div className="limit-value-container">
                <p className="limit-value">{limitValue}</p>
              </div>
              <button
                type="button"
                className="on-decrement"
                onClick={this.onIncrement}
                disabled={isButtonDisabled}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
