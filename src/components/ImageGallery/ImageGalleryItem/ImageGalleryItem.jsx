import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,

  setCurrentImage,
}) => (
  <Item key={id}>
    <Image
      onClick={() => setCurrentImage(largeImageURL)}
      src={webformatURL}
      alt=""
    />
  </Item>
);
