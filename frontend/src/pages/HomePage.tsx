import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { DATABASE_URL } from "../constants/constants";
import type { Products } from "../type/product";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";

export const HomePage = () => {
  const [products, setProduct] = useState<Products[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await fetch(`${DATABASE_URL}/product`);
        const data = await response.json();
        setProduct(data);
      } catch {
        setError(true);
      }
    };

    fetchProductsData();
  }, []);

  if (error) {
    return <Box>Something went wrong</Box>;
  }
  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={4} sx={{ flexWrap: "wrap" }}>
        {products.map(({ _id, title, image, price, stock }) => (
          <Grid key={_id} sx={{ flexBasis: "360px" }}>
            <ProductCard
              _id={_id}
              title={title}
              image={image}
              price={price}
              stock={stock}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
