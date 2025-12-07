import { Box, Chip } from "@mui/material";

export interface ProductImageProps {
    name: string;
    imageUrl: string;
    discount?: number;
}

export const ProductImage = ({ imageUrl, discount, name }: ProductImageProps) => {
    return <Box position='relative' sx={{
        width: '100%',
        aspectRatio: '1 / 1',
        overflow: 'hidden',
        borderRadius: '8px',
        flex: '1 1 auto',
    }}>
        <Box
            component="img"
            src={imageUrl}
            alt={name}
            sx={{
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "cover",
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.05)',
                },
            }}
        />
        {discount && <Chip label={`${discount}% Off`} sx={{ backgroundColor: "secondary.main", position: 'absolute', top: 8, right: 8, color: 'secondary.contrastText' }} />}
    </Box>
}