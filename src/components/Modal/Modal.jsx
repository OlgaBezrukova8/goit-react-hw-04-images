import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Window } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay>
        <Window>{this.props.children}</Window>
      </Overlay>,
      modalRoot
    );
  }
}
