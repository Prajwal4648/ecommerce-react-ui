import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/HeroImageBackground.jpg";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "75vh",
        backgroundImage: `url(${heroImg})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        px: 2,
        color: "white",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.35)",
          zIndex: 1,
        }}
      />
      <Box sx={{ textAlign: "center", zIndex: 2, maxWidth: 700, px: 2 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          TOLUS SPRING COLLECTION
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Elevate your wardrobe with timeless pieces crafted for the modern
          individual.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            borderRadius: "30px",
            bgcolor: "white",
            color: "black",
            px: 4,
            py: 1.2,
            fontWeight: 600,
            "&:hover": { bgcolor: "#f5f5f5" },
          }}
          onClick={() => navigate("/products")}
        >
          Buy Now
        </Button>
      </Box>
    </Box>
  );
}
