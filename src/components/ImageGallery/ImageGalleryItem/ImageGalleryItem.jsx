export const ImageGalleryItem = ({ id, largeImageURL, webformatURL }) => (
  <li key={id} className="gallery-item">
    <img src={webformatURL} alt={largeImageURL} />
  </li>
);
