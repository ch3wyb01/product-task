import { Button, Card, CardActionArea, CardContent } from "@mui/material";
import type { Product } from "../api/types";
import { ProductImage } from "./ProductImage";
import { ProductInfo } from "./ProductInfo";

export const ProductCard = (product: Product) => {
    return (
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column", background: '#FAFAFA' }}>
            <CardActionArea
                sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", height: "100%" }}
                aria-label={product.productName}
            >
                <ProductImage
                    imageUrl={product.image.url}
                    discount={product.price.discountPercentage}
                    name={product.productName}
                />
                <CardContent sx={{ pt: 2, height: '172px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <ProductInfo productName={product.productName} price={product.price} />
                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Add to Cart</Button>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};