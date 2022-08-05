import { Component } from 'react';
import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled';

export class SearchBar extends Component {
  render() {
    const { onSubmit } = this.props;

    return (
      <Header>
        <Form onSubmit={onSubmit}>
          <Button type="submit">
            <ButtonLabel>Search</ButtonLabel>
          </Button>

          <Input
            type="text"
            name="name"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}
