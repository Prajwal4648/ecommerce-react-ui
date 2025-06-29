import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Stack,
  Box,
} from '@mui/material';
import {
  FavoriteBorder,
  ShoppingBagOutlined,
} from '@mui/icons-material';
import SearchBar from './SearchBar';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Promo Banner */}
      <Box
        sx={{
          bgcolor: 'black',
          color: 'white',
          textAlign: 'center',
          py: 1,
          fontSize: '0.9rem',
        }}
      >
        FLASH SALE ⚡ 25% OFF Everything – Use code: QUICK25
      </Box>

      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        sx={{ zIndex: 1300, overflow: 'visible' }} // <== updated
      >
        <Toolbar
          sx={{
            px: { xs: 2, md: 4 },
            py: 1.5,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Left Navigation */}
          <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
            {[
              { label: 'Men', path: "/products/category/men's clothing" },
              { label: 'Women', path: "/products/category/women's clothing" },
              { label: 'Kids', path: '/products/category/electronics' },
              { label: 'New & Featured', path: '/products/category/new' },
              { label: 'Gift', path: '/products/category/jewelery' },
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

          {/* Logo */}
          <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                fontSize: { xs: '1.3rem', sm: '1.6rem' },
                cursor: 'pointer',
              }}
              onClick={() => navigate('/products')}
            >
              TOLUS
            </Typography>
          </Box>

          {/* Right Section */}
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="nowrap">
            <Box sx={{ display: { xs: 'block', sm: 'block' } }}> {/* changed xs from 'none' */}
              <SearchBar />
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
