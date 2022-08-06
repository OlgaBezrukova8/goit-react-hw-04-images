import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';
// import { Modal } from '../Modal/Modal';

export const ImageGallery = ({ images, onClick, openModal }) => (
  <List>
    {images.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        largeImageURL={largeImageURL}
        onClick={onClick}
        openModal={openModal}
      />
    ))}
  </List>
);
