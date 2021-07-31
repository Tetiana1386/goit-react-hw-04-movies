import PropTypes from 'prop-types';
import errorImage from '../../img/no_result.jpeg';
import './Error.css';

function ErrorComponent({ texterror }) {
  return (
    <div role="alert" className="Wrapper">
      <img src={errorImage} width="550" alt="no_result" />
      <p text={texterror} className="Text">
        {texterror}
      </p>
    </div>
  );
}

ErrorComponent.propTypes = {
  texterror: PropTypes.string.isRequired,
};

export default ErrorComponent;
