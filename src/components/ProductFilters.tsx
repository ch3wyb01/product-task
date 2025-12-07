import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import type { Facet, FilterOption, Price, PriceRange } from '../api/types';

export interface ProductFiltersProps {
    facets: Facet[];
    onPriceOptionChange: (checked: boolean, priceOption: Price) => void;
    appliedFacets: Record<string, FilterOption[]>;
}

export const ProductFilters = ({
    facets,
    onPriceOptionChange,
    appliedFacets,
}: ProductFiltersProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box component="aside" aria-label="Product Filter Options">
            {facets.map(facet => {
                if (facet.identifier === 'prices') {
                    return (
                        <Accordion defaultExpanded={!isMobile} key={facet.identifier}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography fontWeight="bold">{facet.displayName}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormGroup key={facet.identifier}>
                                    {facet.options.map(option => (
                                        <FormControlLabel
                                            key={option.identifier}
                                            control={
                                                <Checkbox
                                                    sx={{
                                                        '&.Mui-checked': {
                                                            color: 'primary.main',
                                                        },
                                                    }}
                                                    onChange={(
                                                        _event: React.ChangeEvent<HTMLInputElement>,
                                                        checked: boolean,
                                                    ) =>
                                                        onPriceOptionChange(checked, {
                                                            identifier: option.identifier,
                                                            value: option.value as PriceRange,
                                                        })
                                                    }
                                                    checked={
                                                        !!appliedFacets['prices']?.find(
                                                            o => o.identifier === option.identifier,
                                                        )
                                                    }
                                                />
                                            }
                                            label={option.displayValue}
                                        />
                                    ))}
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                    );
                }
            })}
        </Box>
    );
};
