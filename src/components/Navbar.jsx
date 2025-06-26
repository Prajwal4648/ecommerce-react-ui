import { useState, useEffect, useRef } from 'react';
import {
  AppBar, Box, Toolbar, Typography, IconButton, Button,
  Stack, InputBase, Paper, List, ListItem, ListItemButton
} from '@mui/material';
import { Search, FavoriteBorder, ShoppingBagOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const wrapperRef = useRef(null);

  // Product data for search suggestions
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  // Filter suggestions
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

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSuggestions([]);
    }
  };

  return (
    <Box>
      {/* Top sale banner */}
      <Box sx={{ bgcolor: 'black', color: 'white', textAlign: 'center', py: 1, fontSize: '0.9rem' }}>
        Summer Sale 25% OFF – Code <strong>E-Event</strong>
      </Box>

      {/* Navbar */}
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap', px: 4, py: 2, position: 'relative' }}>

          {/* Left Navigation Links */}
          <Stack direction="row" spacing={2}>
            {['Men', 'Women', 'Kids', 'New & Featured', 'Gift'].map((label) => (
              <Button
                key={label}
                sx={{ textTransform: 'none', color: 'black', fontWeight: 500, fontSize: '0.95rem' }}
              >
                {label}
              </Button>
            ))}
          </Stack>

          {/* Center Logo */}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          >
            TOLUS
          </Typography>

          {/* Right Icons and Search */}
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Search Input */}
            <Box ref={wrapperRef} sx={{ position: 'relative' }}>
              <Box
                sx={{
                  bgcolor: '#f1f1f1',
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  width: 200,
                }}
              >
                <InputBase
                  placeholder="Search..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  sx={{ flexGrow: 1 }}
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
                    zIndex: 20,
                    width: '100%',
                    mt: 0.5,
                    maxHeight: 200,
                    overflowY: 'auto',
                  }}
                >
                  <List dense>
                    {suggestions.map(item => (
                      <ListItem key={item.id} disablePadding>
                        <ListItemButton onClick={() => {
                          navigate(`/search?q=${encodeURIComponent(item.title)}`);
                          setQuery(item.title);
                          setSuggestions([]);
                        }}>
                          {item.title}
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Box>

            {/* Icons */}
            <IconButton><FavoriteBorder /></IconButton>
            <IconButton onClick={() => navigate('/cart')}><ShoppingBagOutlined /></IconButton>
            <Button onClick={() => navigate('/login')} sx={{ textTransform: 'none', color: '#000' }}>Login</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
