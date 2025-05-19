import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

const SearchBar = (props) => {
  return (
    <div className="w-40 md:w-80 flex items-center px-4 bg-slate-200 rounded-md">
      <input
        name="Search"
        type="text"
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={props.value}
        onChange={props.onChange}
      />

      {props.value && (
        <IoMdClose
          className="text-xl text-slate-500 cursor-pointer hover:text-black"
          onClick={props.onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className="text-slate-500 cursor-pointer hover:text-black"
        onClick={props.handleSearch}
      />
    </div>
  );
};

export default SearchBar;
