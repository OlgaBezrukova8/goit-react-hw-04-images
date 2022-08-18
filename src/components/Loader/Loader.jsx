import { Circles } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

export const Loader = () => (
  <LoaderContainer>
    <Circles
      className="true"
      height="180"
      width="180"
      radius="8"
      color="#3f51b5"
      ariaLabel="three-dots-loading"
    />
  </LoaderContainer>
);
