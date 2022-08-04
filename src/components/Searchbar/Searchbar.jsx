import { Component } from 'react';

export class SearchBar extends Component {
  render() {
    const { onSubmit } = this.props;
    
    return (
      <header className="searchbar">
        <form className="form" onSubmit={onSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            name="name"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
