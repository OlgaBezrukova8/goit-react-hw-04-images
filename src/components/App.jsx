import { useState, useEffect, useCallback } from 'react';
import * as API from '../services/searchImg-api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Container } from './App.styled';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = useCallback(() => {
    if (name.length === 0) {
      return;
    }

    API.getImageAPI(name, page)
      .then(response => {
        setImages(prevState => [
          ...prevState,
          ...response.map(({ id, webformatURL, largeImageURL }) => {
            return { id, webformatURL, largeImageURL };
          }),
        ]);
        if (response.length < 12) {
          setIsEndReached(true);
        }
        setIsLoading(false);
      })
      .catch(error => {
        setError({ error });
        setIsLoading(false);
      });
  }, [name, page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      const currentValue = event.target.name.value;

      if (currentValue === '' && images.length === 0) {
        Notify.warning('Whoops, incorrectly entered query');
      }

      if (currentValue === name) {
        Notify.info('Enter another query, please :)');
        return;
      }

      setName(currentValue);
      setImages([]);
      setPage(1);
      setIsEndReached(false);
      setIsLoading(true);
    },
    [images, name]
  );

  const onCloseModal = event => {
    if (event.target === event.currentTarget) {
      setImage('');
    }
  };

  const onCloseModalEscape = () => setImage('');

  const setCurrentImage = img => setImage(img);

  const counterPage = () => {
    setIsLoading(true);
    setPage(prevState => prevState + 1);
  };

  return (
    <Container>
      {error &&
        Notify.failure(
          `Whoops, something went wrong: ${error.message}. Reload page, please`
        )}
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} setCurrentImage={setCurrentImage} />
      )}
      {image && (
        <Modal
          image={image}
          onCloseModalEscape={onCloseModalEscape}
          onCloseModal={onCloseModal}
        />
      )}
      {!isLoading && images.length > 0 && !isEndReached && (
        <Button title="Load more" showHandler={counterPage} />
      )}
      {isLoading && <Loader />}
    </Container>
  );
};
