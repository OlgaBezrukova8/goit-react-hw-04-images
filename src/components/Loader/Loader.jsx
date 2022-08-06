import { Circles } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

export const Loader = () => (
  <LoaderContainer>
    <Circles
      className="true"
      height="380"
      width="380"
      radius="8"
      color="#3f51b5"
      ariaLabel="three-dots-loading"
    />
  </LoaderContainer>
);
