export const ImageGalleryItem = ({ id, webformatURL }) => (
  <li id={id} className="gallery-item">
    <img src={webformatURL} alt="" />
  </li>
);
