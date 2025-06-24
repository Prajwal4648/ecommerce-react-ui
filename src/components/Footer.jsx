import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  Stack,
  Link as MuiLink,
  useTheme,
  useMediaQuery,
} from '@mui/material';

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ bgcolor: '#fff', px: { xs: 2, md: 10 }, pt: 8, pb: 6 }}>
      {/* Newsletter Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h6" fontWeight="bold">
          Stay up to date with our latest offers and news
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Join our newsletter and get early access to new collections
        </Typography>

        <Box
          sx={{
            mt: 3,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 2,
            alignItems: 'center',
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          <TextField
            placeholder="Your Email"
            size="small"
            fullWidth
            variant="outlined"
            sx={{
              bgcolor: '#fafafa',
              input: { py: 1.2, px: 2 },
            }}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: '#000',
              color: '#fff',
              px: 4,
              py: 1.4,
              borderRadius: 1,
              textTransform: 'none',
              width: isMobile ? '100%' : 'auto',
              '&:hover': { bgcolor: '#222' },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>

      {/* Main Footer Grid */}
      <Grid
        container
        spacing={4}
        sx={{ maxWidth: 1200, mx: 'auto', mb: 6 }}
        justifyContent="space-between"
      >
        {[
          {
            title: 'Product',
            links: ["Men's", "Women's", 'Kids', 'Accessories', 'Gift Cards'],
          },
          {
            title: 'Categories',
            links: ['Shirts', 'Pants', 'Jackets', 'Shoes', 'Accessories'],
          },
          {
            title: 'Our Social Media',
            links: ['Instagram', 'Facebook', 'Twitter', 'YouTube', 'Pinterest'],
          },
          {
            title: 'Customer Care',
            links: ['Contact Us', 'Size Guide', 'Shipping Info', 'Returns', 'FAQ'],
          },
        ].map((section) => (
          <Grid item xs={6} sm={3} key={section.title}>
            <Typography fontWeight="bold" gutterBottom>
              {section.title}
            </Typography>
            {section.links.map((link) => (
              <Typography
                key={link}
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.8, cursor: 'pointer' }}
              >
                {link}
              </Typography>
            ))}
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mb: 3 }} />

      {/* Bottom Footer Bar */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          maxWidth: 1200,
          mx: 'auto',
          flexWrap: 'wrap',
        }}
      >
        {/* Left: Logo + Tagline */}
        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Typography variant="h6" fontWeight="bold" sx={{ mr: 1 }}>
            TOLUS
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Experience fashion that fits your lifestyle with our modern collections
          </Typography>
        </Box>

        {/* Right: Footer Links */}
        <Stack direction="row" spacing={3} flexWrap="wrap">
          {['Terms & Conditions', 'Privacy Policy', 'Cookie Policy'].map((item) => (
            <MuiLink
              key={item}
              href="#"
              underline="none"
              color="text.secondary"
              fontSize="14px"
            >
              {item}
            </MuiLink>
          ))}
        </Stack>
      </Box>

      {/* Copyright */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mt: 2,
          textAlign: { xs: 'center', sm: 'right' },
          maxWidth: 1200,
          mx: 'auto',
        }}
      >
        © 2024 Tolus Productions.
      </Typography>
    </Box>
  );
}
