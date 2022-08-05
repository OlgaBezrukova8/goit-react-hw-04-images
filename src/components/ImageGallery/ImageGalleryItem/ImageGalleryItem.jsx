import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, webformatURL }) => (
  <Item key={id}>
    <Image src={webformatURL} alt="" />
  </Item>
);
