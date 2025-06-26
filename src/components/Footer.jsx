import { Box, Grid, Typography, TextField, Button, Divider, Stack, Link as MuiLink, useTheme, useMediaQuery } from '@mui/material';

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ bgcolor: '#fff', px: { xs: 2, md: 10 }, pt: 8, pb: 6 }}>
      <Box textAlign="center" mb={8}>
        <Typography variant="h6" fontWeight="bold">Stay updated with our offers</Typography>
        <Box sx={{ mt: 3, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, justifyContent: 'center' }}>
          <TextField placeholder="Your Email" size="small" variant="outlined" sx={{ bgcolor: '#fafafa', input: { py: 1.2 } }} />
          <Button variant="contained" sx={{ bgcolor: '#000', color: '#fff', width: isMobile ? '100%' : 'auto' }}>Submit</Button>
        </Box>
      </Box>
      <Grid container spacing={4} justifyContent="space-between" sx={{ maxWidth: 1200, mx: 'auto', mb: 6 }}>
        {[
          { title: 'Product', links: ["Men's", "Women's", 'Kids', 'Accessories'] },
          { title: 'Categories', links: ['Shirts','Pants','Jackets','Shoes'] },
          { title: 'Follow Us', links: ['Instagram','Facebook','Twitter','YouTube'] },
          { title: 'Customer Care', links: ['Contact Us','Size Guide','Shipping','Returns'] },
        ].map(sec => (
          <Grid item xs={6} sm={3} key={sec.title}>
            <Typography fontWeight="bold" gutterBottom>{sec.title}</Typography>
            {sec.links.map(link => (
              <Typography key={link} variant="body2" color="text.secondary" sx={{ mb: 0.8 }}>{link}</Typography>
            ))}
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ mb: 3 }} />
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" maxWidth="1200px" mx="auto" flexWrap="wrap">
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="h6" fontWeight="bold">TOLUS</Typography>
          <Typography variant="body2" color="text.secondary">Fashion that fits your lifestyle</Typography>
        </Box>
        <Stack direction="row" spacing={3} flexWrap="wrap">
          {['Terms', 'Privacy', 'Cookie'].map(item => (
            <MuiLink key={item} href="#" underline="none" color="text.secondary" fontSize="14px">{item}</MuiLink>
          ))}
        </Stack>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: { xs: 'center', sm: 'right' } }}>
        © 2025 Tolus Productions.
      </Typography>
    </Box>
  );
}
