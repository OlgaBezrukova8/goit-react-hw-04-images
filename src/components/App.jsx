import { Component } from 'react';
import * as API from '../services/searchImg-api.js';

import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

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
      const response = await API.getImageAPI(this.state.name);

      this.setState({
        images: response.map(({ id, webformatURL, largeImageURL }) => {
          return { id, webformatURL, largeImageURL };
        }),
      });
    }
    // this.setState({ isLoading: true });

    // try {
    //   const images = await this.getImages(this.state.images);
    //   this.setState(prevState => ({
    //     images: [
    //       ...prevState.images,
    //       {
    //         id: images.id,
    //         webformatURL: images.webformatURL,
    //         largeImageURL: images.largeImageURL,
    //       },
    //     ],
    //   }));
    // } catch (error) {
    //   console.log(error);
    // }
  }

  handleSubmit = event => {
    event.preventDefault();
    // if (this.state.name.trim() === '') {
    //   return alert('Enter image name');
    // }
    // console.log(event.target.name.value);

    const currentValue = event.target.name.value;
    // console.log(event.target.name.value);

    this.setState({ name: currentValue });
    // console.log(this.state.name);

    // this.setState(prevState => ({
    //   images: [
    //     ...prevState.images,
    //     {
    //       // id: this.state.images.id,
    //       // webformatURL: this.state.images.webformatURL,
    //       // largeImageURL: this.state.images.largeImageURL,
    //     },
    //   ],
    // }));
  };

  getImages = async imgName => {
    // console.log(imgName);
    // await API.getImageAPI(imgName);
  };

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handleSubmit} />
        {this.state.images.length > 0 ? (
          <ImageGallery images={this.state.images} />
        ) : null}
      </div>
    );
  }
}
