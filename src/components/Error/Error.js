import PropTypes from 'prop-types';
import errorImage from '../../img/no_result.jpeg';
import './Error.css';

function ErrorComponent({ message }) {
  return (
    <div role="alert" className="Wrapper">
      <img src={errorImage} width="550" alt="no_result" />
      <p text={message} className="Text">
        {message}
      </p>
    </div>
  );
}

ErrorComponent.propTypes = {
  texterror: PropTypes.string.isRequired,
};

export default ErrorComponent;
