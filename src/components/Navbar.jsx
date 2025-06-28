import { useState, useEffect, useRef } from 'react'; 
import {
  AppBar, Box, Toolbar, Typography, IconButton, Button,
  Stack, InputBase, Paper, List, ListItem, ListItemButton
} from '@mui/material';
import {
  Search,
  FavoriteBorder,
  ShoppingBagOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
    } else {
      const filtered = products
        .filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
    }
  }, [query, products]);

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
      <Box
        sx={{
          bgcolor: 'black',
          color: 'white',
          textAlign: 'center',
          py: 1,
          fontSize: '0.9rem',
        }}
      >
        Summer Sale 25% OFF – Code <strong>E-Event</strong>
      </Box>

      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            px: { xs: 2, md: 4 },
            py: 1.5,
          }}
        >
          {/* Left Navigation */}
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {[
              { label: 'Men', path: '/Products/Filters' },
              { label: 'Women', path: '/Products/Filters' },
              { label: 'Kids', path: '/Products/Filters' },
              { label: 'New & Featured', path: '/Products/Filters' },
              { label: 'Gift', path: '/Products/Filters' },
            ].map(({ label, path }) => (
              <Button
                key={label}
                onClick={() => navigate(path)}
                sx={{
                  textTransform: 'none',
                  color: 'black',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  px: 1.5,
                  '&:hover': { bgcolor: 'transparent', color: 'primary.main' },
                }}
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
              transform: 'translateX(-50%)',
              fontSize: { xs: '1.3rem', sm: '1.6rem' },
            }}
          >
            TOLUS
          </Typography>

          {/* Right Section */}
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
            <Box ref={wrapperRef} sx={{ position: 'relative' }}>
              <Box
                sx={{
                  bgcolor: '#f1f1f1',
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  width: { xs: '100%', sm: 200 },
                }}
              >
                <InputBase
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  sx={{ flexGrow: 1 }}
                />
                <IconButton onClick={handleSearch}>
                  <Search />
                </IconButton>
              </Box>

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
                    {suggestions.map((item) => (
                      <ListItem key={item.id} disablePadding>
                        <ListItemButton
                          onClick={() => {
                            navigate(`/search?q=${encodeURIComponent(item.title)}`);
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

            <IconButton>
              <FavoriteBorder />
            </IconButton>

            <IconButton onClick={() => navigate('/cart')}>
              <ShoppingBagOutlined />
            </IconButton>

            <Button
              onClick={() => navigate('/login')}
              sx={{
                textTransform: 'none',
                color: '#000',
                fontWeight: 500,
                fontSize: '0.9rem',
              }}
            >
              Login
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
