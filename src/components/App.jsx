import { Component } from 'react';
import * as API from '../services/searchImg-api.js';

import { Container } from './App.styled';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    images: [],
    name: '',
    page: 1,
    isLoading: false,
    error: null,
  };

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

  handleSubmit = event => {
    event.preventDefault();

    const currentValue = event.target.name.value;
    this.setState({ name: currentValue });
  };

  render() {
    return (
      <Container>
        <SearchBar onSubmit={this.handleSubmit} />
        {this.state.images.length > 0 ? (
          <ImageGallery images={this.state.images} />
        ) : null}
        {/* <Modal images={this.state.images} /> */}
        <Button />
      </Container>
    );
  }
}
