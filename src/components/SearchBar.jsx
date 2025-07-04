import { useState, useEffect } from 'react';
import {
  Box,
  InputBase,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error('Failed to fetch products:', err));
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
    } else {
      const filtered = products
        .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
    }
  }, [query, products]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSuggestions([]);
    }
  };

  return (
    <Box sx={{ position: 'relative', maxWidth: 300, width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '999px',
          px: 2,
          height: 36,
          bgcolor: '#f5f5f5',
        }}
      >
        <InputBase
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          disableUnderline
          sx={{
            flex: 1,
            fontSize: '0.9rem',
            height: '100%',
            '& input': {
              padding: 0,
              margin: 0,
              height: '100%',
              lineHeight: '36px',
              border: 'none',
              background: 'transparent',
              outline: 'none',
            },
          }}
        />
        <IconButton onClick={handleSearch} sx={{ p: 0.5 }}>
          <Search fontSize="small" />
        </IconButton>
      </Box>

      {suggestions.length > 0 && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 1500,
            width: '100%',
            mt: 0.5,
            maxHeight: 200,
            overflowY: 'auto',
          }}
        >
          <List dense>
            {suggestions.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(`/search?q=${item.title}`);
                    setQuery(item.title);
                    setSuggestions([]);
                  }}
                  sx={{ fontSize: '0.85rem' }}
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
