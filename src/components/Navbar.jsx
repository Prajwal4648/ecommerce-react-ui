import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Stack,
} from '@mui/material';
import { Search, FavoriteBorder, ShoppingBagOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box>
      {/* TOP BLACK BAR */}
      <Box
        sx={{
          bgcolor: 'black',
          color: 'white',
          textAlign: 'center',
          py: 1,
          fontSize: '0.9rem',
        }}
      >
        Get 25% Off This Summer Sale. Code <b>E-Event</b> | Best - 45% - 95%
      </Box>

      {/* MAIN WHITE NAVBAR */}
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            px: 4,
            py: 2,
          }}
        >
          {/* LEFT MENU LINKS */}
          <Stack direction="row" spacing={3}>
            {['Men', 'Women', 'Kids', 'New & Featured', 'Gift'].map((item) => (
              <Button
                key={item}
                onClick={() => navigate('/products')}
                sx={{ color: '#000', fontWeight: 500, textTransform: 'none' }}
              >
                {item}
              </Button>
            ))}
          </Stack>

          {/* CENTER LOGO */}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', color: '#111' }}
          >
            TOLUS
          </Typography>

          {/* RIGHT ICONS */}
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton>
              <Search />
            </IconButton>
            <IconButton>
              <FavoriteBorder />
            </IconButton>
            <IconButton onClick={() => navigate('/pages/Cart/Cart')}>
              <ShoppingBagOutlined />
            </IconButton>
            <Button onClick={() => navigate('/pages/Auth/Login')} sx={{ textTransform: 'none', color: '#000', fontWeight: 600 }}>
              Login
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
