import { useState, useEffect } from 'react';
import {
  Box,
  InputBase,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemButton
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Fetch all products once for suggestions
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  // Filter suggestions on every query change
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
    } else {
      const filtered = products.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    }
  }, [query, products]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${query.trim()}`);
      setSuggestions([]);
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Search Input */}
      <Box
        sx={{
          bgcolor: '#f1f1f1',
          px: 2,
          py: 0.5,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <InputBase
          placeholder="Search..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          sx={{ width: 200 }}
        />
        <IconButton onClick={handleSearch}>
          <Search />
        </IconButton>
      </Box>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            zIndex: 10,
            width: '100%',
            mt: 0.5,
            maxHeight: 200,
            overflowY: 'auto',
          }}
        >
          <List dense>
            {suggestions.map(item => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(`/search?q=${item.title}`);
                    setQuery(item.title);
                    setSuggestions([]);
                  }}
                >
                  {item.title}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}
