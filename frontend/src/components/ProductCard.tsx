import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useCart } from "../context/Cart/CartContext";

interface Props {
  _id: string;
  title: string;
  image: string;
  price: number;
  stock: number;
}

export const ProductCard = ({ _id, title, image, price }: Props) => {
  const { addItemToCart } = useCart();
  return (
    <Card>
      <CardMedia sx={{ height: 200 }} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          SR {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={() => addItemToCart(_id)}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};
