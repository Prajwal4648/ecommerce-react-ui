import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/HeroImageBackground.jpg";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: { xs: "60vh", md: "75vh" },
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        px: 2,
        color: "white",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          zIndex: 2,
          textAlign: "center",
          maxWidth: 700,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
          sx={{
            fontSize: {
              xs: "2rem",
              sm: "2.5rem",
              md: "3rem",
            },
          }}
        >
          TOLUS SPRING COLLECTION
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 4,
            fontSize: { xs: "1rem", sm: "1.2rem" },
          }}
        >
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
            fontSize: { xs: "0.9rem", sm: "1rem" },
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
