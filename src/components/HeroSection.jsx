import { Box, Typography, Button } from '@mui/material';

export default function HeroSection() {
  return (
    <Box
      sx={{
        height: '80vh',
        backgroundImage: 'url(https://vibrant-react-storefront.lovable.app/static/media/hero2.f11d8bc8363ffb29538c.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        px: 6,
      }}
    >
      <Box>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Summer Styles Are Finally Here
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Don’t compromise on style! Get flat 30% off for new arrivals.
        </Typography>
        <Button variant="contained" size="large" sx={{ borderRadius: '30px' }}>
          SHOP NOW
        </Button>
      </Box>
    </Box>
  );
}
