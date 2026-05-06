type FiltersCount = Record<string, number>;

export const formatFilters = (FILTERS_COUNT: FiltersCount) =>
    (Object.keys(FILTERS_COUNT) as Array<keyof typeof FILTERS_COUNT>).map(
        (x) =>
            `${x.charAt(0).toUpperCase() + x.substring(1)} (${FILTERS_COUNT[x]})`,
    );
