import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Button,
  Container,
  Fade,
} from "@mui/material";
import { Masonry } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import HeroSection from "../../components/HeroSection";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [newCollection, setNewCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=12")
      .then((res) => res.json())
      .then((data) => {
        const slimFitIndex = data.findIndex((p) =>
          p.title.toLowerCase().includes("mens casual slim fit")
        );
        const slimFitProduct = data.splice(slimFitIndex, 1)[0];
        const reordered = [slimFitProduct, ...data];
        setProducts(reordered.slice(0, 8));
        setNewCollection(reordered.slice(8));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const ProductCard = ({ product, index }) => (
    <Fade in timeout={400 + index * 100}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: 440,
          borderRadius: 3,
          boxShadow: 2,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-4px)",
          },
        }}
      >
        {/* Image section */}
        <Box
          sx={{
            height: 200,
            bgcolor: "#fafafa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            sx={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Text section */}
        <CardContent
          sx={{
            textAlign: "center",
            px: 2,
            minHeight: 120,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontStyle: "italic", mb: 0.5 }}
          >
            {product.category}
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              mb: 1,
            }}
          >
            {product.title}
          </Typography>
          <Typography variant="h6" fontWeight={700} color="primary">
            ${product.price.toFixed(2)}
          </Typography>
        </CardContent>

        {/* Button */}
        <Box sx={{ px: 2, pb: 2 }}>
          <Button
            fullWidth
            sx={{
              borderRadius: "50px",
              fontWeight: 600,
              textTransform: "uppercase",
              py: 1,
              fontSize: "0.9rem",
              background: "linear-gradient(to right, #1976d2, #42a5f5)",
              color: "#fff",
              "&:hover": {
                background: "linear-gradient(to right, #1565c0, #1e88e5)",
              },
            }}
            onClick={() => navigate(`/products/${product.id}`)}
          >
            Buy Now
          </Button>
        </Box>
      </Card>
    </Fade>
  );

  return (
    <>
      <HeroSection />

      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" mb={1}>
          Popular Products
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          mb={4}
        >
          Handpicked items our customers love most.
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" py={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={3}>
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </Masonry>
        )}
      </Container>

      <Box sx={{ background: "#f9f9f9", py: 6 }}>
        <Container>
          <Box display="flex" justifyContent="center" mb={1}>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                borderBottom: "4px solid #1976d2",
                pb: 1,
              }}
            >
              New Collection
            </Typography>
          </Box>

          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            mb={4}
          >
            Discover elegance and innovation in our latest arrivals.
          </Typography>

          <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={3}>
            {newCollection.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i + 10} />
            ))}
          </Masonry>
        </Container>
      </Box>
    </>
  );
}
