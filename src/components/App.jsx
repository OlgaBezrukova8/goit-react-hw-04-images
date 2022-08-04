import { Component } from 'react';
import * as API from '../services/searchImg-api.js';

import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    isLoading: false,
    error: null,
  };

  handleSubmit = event => {
    event.preventDefault();
    const currentValue = event.target.name.value;
    const api = this.getImages(currentValue);
    console.log(api);

    this.setState(prevState => ({
      images: [
        ...prevState.images,
        {
          id: '',
          webformatURL: '',
          largeImageURL: '',
        },
      ],
    }));
  };

  getImages = async name => {
    await API.getImageAPI(name).then(response => console.log(response));
  };

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
      </div>
    );
  }
}
