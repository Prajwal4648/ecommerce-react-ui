import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '75vh',
        background: `url(https://vibrant-react-storefront.lovable.app/static/media/hero2.f11d8bc8363ffb29538c.png) center/cover`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        color: 'white',
        px: 2,
      }}
    >
      {/* Optional overlay for better readability */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />
      <Box sx={{ textAlign: 'center', zIndex: 2 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          TOLUS SPRING COLLECTION
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          Elevate your wardrobe with timeless pieces crafted for the modern individual.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ borderRadius: '30px', bgcolor: 'white', color: 'black', ':hover': { bgcolor: '#f5f5f5' } }}
          onClick={() => navigate('/products')}
        >
          Buy Now
        </Button>
      </Box>
    </Box>
  );
}
