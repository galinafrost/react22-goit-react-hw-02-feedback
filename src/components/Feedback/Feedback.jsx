import { useState } from 'react';

import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Notification from './Notification';

const INITIAL_FEEDBACK = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const Feedback = () => {
  const [feedback, setFedback] = useState(INITIAL_FEEDBACK);

  const setFeedback = property => {
    setFedback(prevState => {
      const value = prevState[property];
      return {
        ...feedback,
        [property]: value + 1,
      };
    });
  };

  const countTotalFeedback = () => {
    const total = Object.values(feedback).reduce((previousValue, number) => {
      return previousValue + number;
    }, 0);

    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    let sum = 0;
    if (feedback.good !== '') {
      sum = (feedback.good * 100) / countTotalFeedback();
    }
    return Math.round(sum);
  };

  const { good, neutral, bad } = feedback;
  const result = countTotalFeedback();
  const positiv = countPositiveFeedbackPercentage();

  return (
    <div>
      <h1>Please leave feedback</h1>
      <FeedbackOptions options={feedback} onLeaveFeedback={setFeedback} />

      {result > 0 ? (
        <>
          <h2>Statistics</h2>
          <div>
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={positiv}
            />
          </div>
        </>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </div>
  );
};

export default Feedback;
