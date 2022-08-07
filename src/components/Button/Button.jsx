import PropTypes from 'prop-types';
import { ButtonLoad, Container } from './Button.styled';

export const Button = ({ showHandler }) => (
  <Container>
    <ButtonLoad onClick={() => showHandler()} type="button">
      Load more
    </ButtonLoad>
  </Container>
);

Button.propTypes = {
  showHandler: PropTypes.func.isRequired,
};
