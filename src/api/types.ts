export type RequestBody = {
    query: string;
    pageNumber: number;
    size: number;
    additionalPages: number;
    sort: number
}

export type Price = {
    identifier: string;
    value: {
        gte: number;
        lte: number;
    };
}

// Response types
export type Pagination = {
    from: number;
    fromCount: number;
    size: number;
    total: number;
    sortType: number;
};

export type FacetOption = {
    identifier: string;
    value: string | PriceRange | boolean;
    displayValue: string;
    productCount: number;
    priority: number;
};

export type PriceRange = {
    gte?: number;
    lte?: number;
};

export type Facet = {
    identifier: string;
    displayName: string;
    priority: number;
    options: FacetOption[];
    facetType: number;
};

export type Image = {
    externalId: string;
    url: string;
    priority: number;
    isDefault: boolean;
    attributes: {
        imageAltText: string;
    };
};

export type StockStatus = {
    status: string;
    stockLevel?: number;
};

export type ProductPrice = {
    currencyCode: string;
    wasPriceIncTax?: number;
    wasPriceExcTax?: number;
    priceIncTax: number;
    priceExcTax: number;
    isOnPromotion: boolean;
    discountPercentage?: number;
    monthlyFinanceEstimate?: number;
};

export type CategoryAncestor = {
    slug: string;
    externalId: string;
    name: string;
    depth: number;
};

export type Category = {
    externalId: string;
    slug: string;
    name: string;
    isDefault: boolean;
    ancestors: CategoryAncestor[];
    level: number;
};

export type Brand = {
    externalId: string;
    slug: string;
    name: string;
    brandImage: Image;
    level: number;
};

export type Product = {
    id: string;
    variantId: string;
    legacyId?: string;
    legacyVariantId?: string;
    cultureCode: string;
    isDefaultVariant: boolean;
    sku: string;
    productName: string;
    slug: string;
    averageRating?: number;
    reviewsCount: number;
    questionsCount: number;
    image: Image;
    stockStatus: StockStatus;
    price: ProductPrice;
    attributes: Record<string, unknown>;
    defaultCategory: Category;
    brand: Brand;
    isInRange: boolean;
};

export type Response = {
    pagination: Pagination;
    facets: Facet[];
    products: Product[];
};

// o 1 = Recommended
// o 2 = PriceLowToHigh
// o 3 = PriceHighToLow
// o 4 = LargestDiscount