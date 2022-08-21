import PropTypes from 'prop-types';

import style from './feedback-options.module.css';

const FeedbackOptions = ({ options, onLeaveFeedback }) => {
  const elements = Object.keys(options).map(item => (
    <button key={item} onClick={() => onLeaveFeedback(item)}>
      {item}
    </button>
  ));

  return <div className={style.items}>{elements}</div>;
};

export default FeedbackOptions;

FeedbackOptions.propTypes = {
  onLeaveFeedback: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
};
