import { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import css from './Searchbar.module.css'
import PropTypes from 'prop-types';

export const SearchBar =({onSubmit}) => {
const [searchQuery, setSearchQuery] = useState('')
   
   const handleSearch = e => {
        setSearchQuery(e.currentTarget.value.toLowerCase() )
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (searchQuery.trim() === '') {
            return;
        };
        onSubmit(searchQuery);
        setSearchQuery('')
    };
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={handleSubmit}>
                    <button type="submit" className={css.SearchForm_button} aria-label='search-button'>
                        <GoSearch width='28' height='28' fill='#1a1212' />
                    </button>
                
                    <input
                        className={css.SearchForm_input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        value={searchQuery}
                        placeholder="Search images and photos"
                        onChange={handleSearch}
                    />
                </form>
            </header>
        )
};
SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
