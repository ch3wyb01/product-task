import { Box } from "@mui/material";
import type { Product } from "../api/types";
import { ProductCard } from "./ProductCard";

export interface ProductGridProps {
    products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
    return (
        <Box
            component="section"
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 2,
                alignItems: "start",
                width: "100%",
                px: 2,
            }}
        >
            {products.map((p) => (
                <ProductCard key={p.id} {...p} />
            ))}
        </Box>
    );
}