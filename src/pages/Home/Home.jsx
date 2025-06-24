import { Box, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';

const products = [
  {
    title: 'T-Shirt',
    image: 'https://vibrant-react-storefront.lovable.app/static/media/p1.7d29dbf5dd1c06b9dd6a.png',
  },
  {
    title: 'Coat',
    image: 'https://vibrant-react-storefront.lovable.app/static/media/p2.3934adcd62514bdfa5a1.png',
  },
  {
    title: 'Jacket',
    image: 'https://vibrant-react-storefront.lovable.app/static/media/p3.77961eb4b748fc65fd2d.png',
  },
];

export default function Home() {
  return (
    <Box sx={{ px: 6, py: 8 }}>
      <Typography variant="h4" fontWeight={600} textAlign="center" mb={4}>
        Popular Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((prod, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card sx={{ p: 2, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
              <CardMedia component="img" image={prod.image} height="300" />
              <CardContent>
                <Typography variant="h6" textAlign="center">
                  {prod.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
