import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [newCollection, setNewCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerImage, setBannerImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=12')
      .then(res => res.json())
      .then(data => {
        setProducts(data.slice(0, 8));
        setNewCollection(data.slice(8));
        setBannerImage(data[0]?.image);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const ProductCard = ({ product }) => (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          height: '100%',
          minHeight: 420,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: 3,
          boxShadow: 3,
          transition: '0.3s',
          '&:hover': {
            boxShadow: 6,
            transform: 'translateY(-4px)',
          },
        }}
      >
        {/* Image */}
        <Box
          sx={{
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            sx={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        </Box>

        {/* Title & Price */}
        <CardContent sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            gutterBottom
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              height: 48,
              textAlign: 'center',
            }}
          >
            {product.title}
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            fontWeight={500}
          >
            ${product.price.toFixed(2)}
          </Typography>
        </CardContent>

        {/* Button */}
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              borderRadius: '20px',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
            onClick={() => navigate(`/products/${product.id}`)}
          >
            Buy Now
          </Button>
        </Box>
      </Card>
    </Grid>
  );

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: '60vh', md: '75vh' },
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          color: 'white',
          textAlign: 'center',
          mb: 6,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h3" fontWeight={700}>
            TOLUS SPRING COLLECTION
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            Elevate your wardrobe with timeless pieces crafted for the modern individual.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 3, borderRadius: '30px' }}
            onClick={() => navigate('/products')}
          >
            Shop Now
          </Button>
        </Box>
      </Box>

      {/* Popular Products */}
      <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
        <Typography variant="h4" fontWeight={600} textAlign="center" mb={4}>
          Popular Products
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        )}
      </Box>

      {/* New Collection Section */}
      <Box textAlign="center" mt={10} px={{ xs: 2, md: 6 }}>
        <Typography variant="h5" fontWeight={600}>NEW COLLECTION</Typography>
        <Typography variant="body1" color="text.secondary" mt={2} mb={6}>
          Discover elegance and style with our freshly curated collection.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {newCollection.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Box>
    </>
  );
}
