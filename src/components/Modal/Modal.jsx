import { Overlay, Window } from './Modal.styled';

export const Modal = ({ images }) => (
  <Overlay>
    {images.map(({ largeImageURL }) => (
      <Window>
        <img src={largeImageURL} alt="" />
      </Window>
    ))}
  </Overlay>
);
