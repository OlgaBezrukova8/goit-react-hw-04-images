import { Component } from 'react';

export class SearchBar extends Component {
  handleChange = () => {};

  render() {
    return (
      <header class="searchbar">
        <form class="form" onChange={this.handleChange}>
          <button type="submit" class="button">
            <span class="button-label">Search</span>
          </button>

          <input
            class="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
