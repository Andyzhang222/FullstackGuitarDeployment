import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';

const SearchBarContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '5px',
  borderRadius: '5px',
  width: '800px',
  height: '40px',
  boxSizing: 'border-box',
  background: '#FFFFFF',
});

const SearchInput = styled('input')({
  width: '221.79px',
  height: '24px',
  border: 'none',
  outline: 'none',
  flex: 1,
});

interface SearchBarProps {
  searchTerm?: string; // 可选的 searchTerm prop
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm = '' }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/search?query=${inputValue}`);
    }
  };

  return (
    <SearchBarContainer>
      <IconButton>
        <img src="/images/Header/Vector.svg" alt="Search Icon" />
      </IconButton>
      <SearchInput
        placeholder="Find guitars you love..."
        value={inputValue}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        style={{
          fontFamily: 'Roboto, Arial, sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '22px',
          textAlign: 'left',
          color: '#595959',
        }}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
