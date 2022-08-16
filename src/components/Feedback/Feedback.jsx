import { Component } from 'react';

import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Notification from './Notification';

class Feedback extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  static btnOptions = ['good', 'neutral', 'bad'];

  setFeedback = property => {
    this.setState(prevState => {
      const value = prevState[property];
      return {
        [property]: value + 1,
      };
    });
  };

  countTotalFeedback = () => {
    const total = Object.values(this.state).reduce((previousValue, number) => {
      return previousValue + number;
    }, 0);

    return total;
  };

  countPositiveFeedbackPercentage = () => {
    let sum = 0;
    if (this.state.good !== '') {
      sum = (this.state.good * 100) / this.countTotalFeedback();
    }
    return Math.round(sum);
  };

  render() {
    const { good, neutral, bad } = this.state;
    const result = this.countTotalFeedback();
    const positiv = this.countPositiveFeedbackPercentage();
    return (
      <div>
        <h1>Please leave feedback</h1>
        <FeedbackOptions
          options={Feedback.btnOptions}
          onLeaveFeedback={this.setFeedback}
        />

        {result > 0 ? (
          <>
            <h2>Statistics</h2>
            <div>
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={this.countTotalFeedback()}
                positivePercentage={positiv}
              />
            </div>
          </>
        ) : (
          <Notification message="There is no feedback" />
        )}
      </div>
    );
  }
}

export default Feedback;
