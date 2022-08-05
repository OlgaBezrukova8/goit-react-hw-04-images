import { Modal } from 'components/Modal/Modal';
import { Item, Image } from './ImageGalleryItem.styled';
// import { Modal } from '../../Modal/Modal';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  onClick,
  // openModal,
}) => (
  <Item key={id}>
    <Image onClick={onClick} src={webformatURL} alt="" />
    {onClick ? (
      <Modal>
        <img src={largeImageURL} alt="" />
      </Modal>
    ) : null}
  </Item>
);
