import { Box, Typography } from '@mui/material';
import type { ProductPrice } from '../api/types';

export interface ProductInfoProps {
    productName: string;
    price: ProductPrice;
}
export const ProductInfo = ({ productName, price }: ProductInfoProps) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={2}
            height="100%"
        >
            <Typography
                variant="h6"
                fontSize="16px"
                sx={{
                    WebkitLineClamp: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: 'vertical',
                    display: '-webkit-box',
                    textAlign: 'left',
                    minHeight: '3.2em',
                }}
            >
                {productName}
            </Typography>
            <Typography
                variant="body2"
                color="secondary.main"
                fontWeight="
            bold"
            >
                {Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: price.currencyCode,
                }).format(price.priceIncTax)}
            </Typography>
        </Box>
    );
};
