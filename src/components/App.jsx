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

  // componentDidUpdate(prevProps, prevState) {
  //   const { name, page } = this.state;

  //   if (name !== prevState.name || page !== prevState.page) {
  //     this.fetchImages();
  //   }
  // }

  // fetchImages = async () => {
  //   const { name, page } = this.state;
  //   this.setState({ isLoading: true });

  //   try {
  //     const response = await API.getImageAPI(name, page);
  //     this.setState(prevState => ({
  //       images: [
  //         ...prevState.images,
  //         ...response.map(({ id, webformatURL, largeImageURL }) => {
  //           return { id, webformatURL, largeImageURL };
  //         }),
  //       ],
  //     }));
  //     if (response.length < 12) {
  //       this.setState({ isEndReached: true });
  //     }
  //   } catch (error) {
  //     this.setState({ error });
  //   }

  //   this.setState({ isLoading: false });
  // };

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
    },
    [images, name]
  );

  const onCloseModalEscape = () => {
    setImage('');
  };

  const onCloseModal = event => {
    if (event.target === event.currentTarget) {
      setImage('');
    }
  };

  const setCurrentImage = img => {
    setImage(img);
  };

  const counterPage = () => {
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

// export class App extends Component {
//   state = {
//     images: [],
//     name: '',
//     image: '',
//     page: 1,
//     isLoading: false,
//     isEndReached: false,
//     error: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { name, page } = this.state;

//     if (name !== prevState.name || page !== prevState.page) {
//       this.fetchImages();
//     }
//   }

//   fetchImages = async () => {
//     const { name, page } = this.state;
//     this.setState({ isLoading: true });

//     try {
//       const response = await API.getImageAPI(name, page);
//       this.setState(prevState => ({
//         images: [
//           ...prevState.images,
//           ...response.map(({ id, webformatURL, largeImageURL }) => {
//             return { id, webformatURL, largeImageURL };
//           }),
//         ],
//       }));
//       if (response.length < 12) {
//         this.setState({ isEndReached: true });
//       }
//     } catch (error) {
//       this.setState({ error });
//     }

//     this.setState({ isLoading: false });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     const { name, images } = this.state;
//     const currentValue = event.target.name.value;

//     if (currentValue === '' && images.length === 0) {
//       Notify.warning('Whoops, incorrectly entered query');
//     }

//     if (currentValue === name) {
//       Notify.info('Enter another query, please :)');
//       return;
//     }

//     this.setState({
//       name: currentValue,
//       images: [],
//       page: 1,
//       isEndReached: false,
//     });
//   };

//   onCloseModalEscape = () => {
//     this.setState({ image: '' });
//   };

//   onCloseModal = event => {
//     if (event.target === event.currentTarget) {
//       this.setState({ image: '' });
//     }
//   };

//   setCurrentImage = img => {
//     this.setState({ image: img });
//   };

//   counterPage = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { images, image, isLoading, isEndReached, error } = this.state;
//     return (
//       <Container>
//         {error &&
//           Notify.failure(
//             `Whoops, something went wrong: ${error.message}. Reload page, please`
//           )}
//         <SearchBar onSubmit={this.handleSubmit} />
//         {images.length > 0 && (
//           <ImageGallery
//             images={images}
//             setCurrentImage={this.setCurrentImage}
//           />
//         )}
//         {image && (
//           <Modal
//             image={image}
//             onCloseModalEscape={this.onCloseModalEscape}
//             onCloseModal={this.onCloseModal}
//           />
//         )}
//         {!isLoading && images.length > 0 && !isEndReached && (
//           <Button title="Load more" showHandler={this.counterPage} />
//         )}
//         {isLoading && <Loader />}
//       </Container>
//     );
//   }
// }
