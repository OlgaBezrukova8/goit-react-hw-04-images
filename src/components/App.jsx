import { Component } from 'react';
import * as API from '../services/searchImg-api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Container } from './App.styled';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    name: '',
    image: '',
    page: 1,
    isLoading: false,
    error: null,
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const { name, page } = this.state;

    if (name !== prevState.name || page !== prevState.page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { name, page } = this.state;
    this.setState({ isLoading: true });

    try {
      const response = await API.getImageAPI(name, page);
      this.setState(prevState => ({
        images: [
          ...prevState.images,
          ...response.map(({ id, webformatURL, largeImageURL }) => {
            return { id, webformatURL, largeImageURL };
          }),
        ],
      }));
    } catch (error) {
      this.setState({ error });
    }

    this.setState({ isLoading: false });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { name, images } = this.state;
    const currentValue = event.target.name.value;

    if (currentValue === '' && images.length === 0) {
      Notify.warning('Whoops, incorrectly entered query');
    }

    if (currentValue === name) {
      Notify.info('Enter another query, please :)');
      return;
    }

    this.setState({ name: currentValue, images: [], page: 1 });
  };

  onCloseModal = () => {
    this.setState({ image: '' });
  };

  setCurrentImage = img => {
    this.setState({ image: img });
  };

  counterPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, image, isLoading, error } = this.state;
    return (
      <Container>
        {error &&
          Notify.failure(`Whoops, something went wrong: ${error.message}`)}
        <SearchBar onSubmit={this.handleSubmit} />
        {images.length > 0 && (
          <ImageGallery
            images={images}
            setCurrentImage={this.setCurrentImage}
          />
        )}
        {image && <Modal image={image} onCloseModal={this.onCloseModal} />}
        {!isLoading && images.length > 0 && (
          <Button title="Load more" showHandler={this.counterPage} />
        )}
        {isLoading && <Loader />}
      </Container>
    );
  }
}
