import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material';

export interface SortSelectProps {
    sortQuery: number;
    onSortChange: (sortQuery: number) => void;
}

export const SortSelect = ({ sortQuery, onSortChange }: SortSelectProps) => {
    const sortOptions = {
        Recommended: 1,
        'Price Low To High': 2,
        'Price High To Low': 3,
        'Largest Discount': 4,
    };

    return (
        <FormControl>
            <InputLabel id="sort-select">Sort</InputLabel>
            <Select
                labelId="sort-select"
                id="sort-select"
                value={sortQuery}
                label="Age"
                onChange={(event: SelectChangeEvent<number>) => onSortChange(event.target.value)}
                color="primary"
            >
                {Object.entries(sortOptions).map(([optionName, optionValue]) => (
                    <MenuItem value={optionValue}>{optionName}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
