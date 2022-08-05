import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => (
  <List>
    {images.map(({ id, webformatURL }) => (
      <ImageGalleryItem key={id} webformatURL={webformatURL} />
    ))}
  </List>
);
