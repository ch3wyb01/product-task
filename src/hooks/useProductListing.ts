import React, { useEffect, useState } from 'react';
import { fetchProductListing } from '../api/listing';
import type { Price, RequestBody, Response } from '../api/types';

const DEFAULT_PARAMS: RequestBody = {
    query: 'baths',
    pageNumber: 1,
    size: 12,
    sort: 1,
    additionalPages: 0,
    facets: {},
};

export const useProductListing = () => {
    const [params, setParamsState] = useState<RequestBody>(DEFAULT_PARAMS);

    const [data, setData] = useState<Response | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const setParams = (newParams: Partial<RequestBody>) => {
        const shouldResetPage =
            'query' in newParams || 'sort' in newParams || 'facets' in newParams;
        setParamsState(prevParams => ({
            ...prevParams,
            ...newParams,
            pageNumber: shouldResetPage ? 1 : prevParams.pageNumber,
        }));
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setParamsState(prevParams => ({
            ...prevParams,
            pageNumber: page,
        }));
    };

    const handlePriceFacetChange = (checked: boolean, priceOption: Price) => {
        if (checked) {
            setParamsState(prevParams => {
                const prevFacets = prevParams.facets;
                const newPriceFacets = prevFacets.prices
                    ? [...prevFacets.prices, priceOption]
                    : [priceOption];
                return {
                    ...prevParams,
                    facets: {
                        ...prevFacets,
                        prices: newPriceFacets,
                    },
                };
            });
        } else {
            setParamsState(prevParams => {
                const prevFacets = prevParams.facets;
                const newPriceFacets = prevFacets.prices.filter(
                    facetOption => facetOption.identifier !== priceOption.identifier,
                );
                const nonPriceFacetsEntries = Object.entries(prevFacets).filter(
                    ([key]) => key !== 'prices',
                );

                const nonPriceFacets = Object.fromEntries(nonPriceFacetsEntries);

                const newFacets =
                    prevFacets.prices && newPriceFacets.length
                        ? {
                              ...prevFacets,
                              prices: newPriceFacets,
                          }
                        : { ...nonPriceFacets };

                return {
                    ...prevParams,
                    facets: {
                        ...newFacets,
                    },
                };
            });
        }
    };

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const result = await fetchProductListing(params);

                if (isMounted) {
                    setData(result);
                }
            } catch (err) {
                if (isMounted) {
                    setError('Failed to fetch product data.');
                    console.error(err);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [params]);

    return {
        data,
        params,
        isLoading,
        error,
        setParams,
        handlePageChange,
        handlePriceFacetChange,
    };
};
