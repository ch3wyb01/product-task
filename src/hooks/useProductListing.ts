import React, { useEffect, useState } from "react";
import { fetchProductListing } from "../api/listing";
import type { RequestBody, Response } from "../api/types";

const DEFAULT_PARAMS: RequestBody = {
    query: 'baths',
    pageNumber: 1,
    size: 12,
    sort: 1,
    additionalPages: 0,
};

export const useProductListing = () => {
    const [params, setParamsState] = useState<RequestBody>(DEFAULT_PARAMS);

    const [data, setData] = useState<Response | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const setParams = (newParams: Partial<Response>) => {
        setParamsState(prevParams => ({
            ...prevParams,
            ...newParams,
            pageNumber: ('query' in newParams || 'sort' in newParams) ? 1 : prevParams.pageNumber,
        }));
    }
    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setParamsState(prevParams => ({
            ...prevParams,
            pageNumber: page,
        }));
    }



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
    };
}