import { Box, CircularProgress, Pagination } from "@mui/material";
import { useProductListing } from "../hooks/useProductListing";
import { ProductGrid } from "./ProductGrid";


export const ProductLayout = () => {
    const { data, isLoading, error, handlePageChange, params } = useProductListing();

    if (isLoading) return <CircularProgress />
    if (error) return <div>Error: {error}</div>

    const totalPages = Math.ceil((data?.pagination.total || 1) / (data?.pagination.size || 1));

    return (
        <Box display='flex' flexDirection='column' gap={2} width='100%'>
            <ProductGrid products={data?.products || []} />
            {totalPages > 1 &&
                <Box display='flex' justifyContent='center' sx={{ flexShrink: 0 }}>
                    <Pagination page={params.pageNumber} onChange={handlePageChange} count={totalPages} color='primary' sx={{
                        '& .MuiPaginationIem-root.Mui-selected': {
                            color: 'primary.contrastText',
                        }
                    }} />
                </Box>
            }
        </Box>
    );
}
