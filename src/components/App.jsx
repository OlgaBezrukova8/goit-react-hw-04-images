import { Component } from 'react';
import * as API from '../services/searchImg-api.js';

import { Container } from './App.styled';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    images: [],
    name: '',
    page: 1,
    isLoading: false,
    showModal: false,
    error: null,
  };

  componentDidMount() {
    window.addEventListener('keydown', event => {
      if (event.code === 'Escape') {
        this.toggleModal();
      }
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.name !== prevState.name) {
      this.setState({ isLoading: true });

      try {
        const response = await API.getImageAPI(this.state.name);
        this.setState({
          images: response.map(({ id, webformatURL, largeImageURL }) => {
            return { id, webformatURL, largeImageURL };
          }),
        });
      } catch (error) {
        console.log(error);
      }

      this.setState({ isLoading: false });
    }
  }

  componentWillUnmount() {}

  handleSubmit = event => {
    event.preventDefault();

    const currentValue = event.target.name.value;
    this.setState({ name: currentValue });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { images, showModal } = this.state;
    // console.log(this.state.images);

    return (
      <Container>
        <SearchBar onSubmit={this.handleSubmit} />
        {images.length > 0 ? (
          <ImageGallery
            images={images}
            onClick={this.toggleModal}
            openModal={showModal}
          />
        ) : null}
        {showModal && (
          <Modal onClose={this.toggleModal}  />
          //   {/* <img src="" alt="" /> */}
          //   <p>ghbdtn</p>
          // </Modal>
        )}
        <Button />
      </Container>
    );
  }
}
