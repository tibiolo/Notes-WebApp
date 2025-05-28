import React, { useState } from 'react';
import axios from '../../utils/axios.js';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from '../Cards/ProfileInfo';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await axios.post('/api/users/logout');

      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post('/api/users/notes/search', {
        query: searchQuery,
      });

      const searchedNotes = response.data;

      props.displaySearchedNotes(searchedNotes);
    } catch (err) {
      console.log('Error searching for notes: ', err);
    }
  };

  const onSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const onClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      {props.showSearchAndUser && (
        <SearchBar
          value={searchQuery}
          onChange={onSearch}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      )}

      {props.showSearchAndUser && (
        <ProfileInfo onLogout={onLogout} username={props.username} />
      )}
    </div>
  );
};

export default Navbar;
