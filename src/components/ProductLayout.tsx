import { Box, CircularProgress, Pagination } from '@mui/material';
import { useProductListing } from '../hooks/useProductListing';
import { ProductFilters } from './ProductFilters';
import { ProductGrid } from './ProductGrid';
import { SortSelect } from './SortSelect';

export const ProductLayout = () => {
    const { data, isLoading, error, handlePageChange, params, setParams, handlePriceFacetChange } =
        useProductListing();

    if (isLoading) return <CircularProgress />;
    if (error) return <div>Error: {error}</div>;

    const totalItems = Number(data?.pagination.total) || 0;
    const pageSize = Number(params.size) || 1;

    const totalPages = Math.ceil(totalItems / pageSize);

    return (
        <Box display="flex" flexDirection="column" gap={3}>
            <Box display="flex" justifyContent="flex-end" px={2}>
                <SortSelect
                    sortQuery={params.sort}
                    onSortChange={(sort: number) => setParams({ sort })}
                />
            </Box>
            <Box display="flex" gap={3}>
                <Box height="200px" width="30%">
                    <ProductFilters
                        facets={data?.facets || []}
                        onPriceOptionChange={handlePriceFacetChange}
                        appliedFacets={params.facets}
                    />
                </Box>
                <Box display="flex" flexDirection="column" gap={2} width="100%">
                    <ProductGrid products={data?.products || []} />
                    {totalPages > 1 && (
                        <Box display="flex" justifyContent="center" sx={{ flexShrink: 0 }}>
                            <Pagination
                                page={params.pageNumber}
                                onChange={handlePageChange}
                                count={totalPages}
                                color="primary"
                                sx={{
                                    '& .MuiPagination-ul': {
                                        flexWrap: 'nowrap',
                                    },
                                }}
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
