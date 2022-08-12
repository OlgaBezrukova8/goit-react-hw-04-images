import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, Window } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ image, onCloseModal, onCloseModalEscape }) => {
  const handleKeyDown = useCallback(
    event => {
      if (event.code === 'Escape') {
        onCloseModalEscape();
      }
    },
    [onCloseModalEscape]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return createPortal(
    <Overlay onClick={onCloseModal}>
      <Window>
        <img src={image} alt="" width="700" height="400" />
      </Window>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};