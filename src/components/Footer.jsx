import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  IconButton,
} from '@mui/material';
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', pt: 8, pb: 4, mt: 10, borderTop: '1px solid #e0e0e0' }}>
      <Container maxWidth="md">
        {/* Email Section */}
        <Typography variant="h5" fontWeight={700} textAlign="center" mb={2}>
          Stay updated with our offers
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          color="text.secondary"
          mb={4}
        >
          Subscribe to get special discounts, new arrivals & fashion updates.
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          mb={4}
        >
          <TextField
            placeholder="Enter your email"
            size="small"
            variant="outlined"
            fullWidth
            sx={{
              maxWidth: 350,
              bgcolor: 'white',
              borderRadius: 1,
            }}
          />
          <Button
            variant="contained"
            size="medium"
            sx={{
              px: 4,
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
              background: 'linear-gradient(to right, #1976d2, #42a5f5)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(to right, #1565c0, #1e88e5)',
              },
            }}
          >
            Submit
          </Button>
        </Stack>

        {/* Social Icons */}
        <Stack direction="row" spacing={2} justifyContent="center" mb={3}>
          <IconButton color="primary" aria-label="Instagram">
            <Instagram />
          </IconButton>
          <IconButton color="primary" aria-label="Facebook">
            <Facebook />
          </IconButton>
          <IconButton color="primary" aria-label="Twitter">
            <Twitter />
          </IconButton>
          <IconButton color="primary" aria-label="YouTube">
            <YouTube />
          </IconButton>
        </Stack>

        <Divider sx={{ my: 4 }} />

        {/* Brand & Legal */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'center', sm: 'flex-start' }}
          spacing={2}
        >
          {/* Left: Logo and tagline */}
          <Box textAlign={{ xs: 'center', sm: 'left' }}>
            <Typography variant="h6" fontWeight={700}>
              TOLUS
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fashion that fits your lifestyle.
            </Typography>
          </Box>

          {/* Right: Legal links */}
          <Stack direction="row" spacing={3}>
            <Typography variant="body2" color="text.secondary">
              Terms
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Privacy
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cookie
            </Typography>
          </Stack>
        </Stack>

        {/* Copyright */}
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mt={4}
        >
          © {new Date().getFullYear()} Tolus Productions. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
