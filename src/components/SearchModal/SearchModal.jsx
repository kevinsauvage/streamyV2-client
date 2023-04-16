import { useEffect, useState } from 'react';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { ImSearch } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

import { stopScroll, unstopScroll } from '../../helpers/scroll';

import './SearchModal.scss';

const SearchModal = ({ displaySearch, setDisplaySearch }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query && query === '') return;
    setDisplaySearch(false);
    navigate({ pathname: `/search`, search: `?query=${query}` });
  };

  useEffect(() => {
    if (displaySearch) stopScroll();
    else unstopScroll();
  }, [displaySearch]);

  if (!displaySearch) return <div />;

  return (
    <div className="search-modal">
      <AiOutlineCloseSquare
        className="search-modal__close"
        onClick={() => {
          setDisplaySearch(false);
        }}
      />
      <form className="search-modal__container" onSubmit={handleSubmit}>
        <input
          value={query}
          type="text"
          placeholder="Search"
          className="search-modal__input"
          onChange={({ target }) => setQuery(target.value)}
        />
        <ImSearch className="search-modal__icon" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default SearchModal;
