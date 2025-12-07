import { Grid } from '@mui/material';
import type { Product } from '../api/types';
import { ProductCard } from './ProductCard';

export interface ProductGridProps {
    products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
    return (
        <Grid
            container
            spacing={2}
            sx={{
                width: '100%',
                px: 2,
                margin: '0 auto',
            }}
        >
            {products.map(p => (
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 4,
                        lg: 3,
                        xl: 2,
                    }}
                    key={p.id}
                >
                    <ProductCard {...p} />
                </Grid>
            ))}
        </Grid>
    );
};
