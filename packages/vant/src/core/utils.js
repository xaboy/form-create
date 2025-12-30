export const normalizeOptions = (options) => {
    if (!options || !Array.isArray(options)) {
        return [];
    }
    return options.map(item => {
        const normalized = {...item};
        if (normalized.label !== undefined && normalized.text === undefined) {
            normalized.text = normalized.label;
        }
        if (normalized.children && Array.isArray(normalized.children)) {
            normalized.children = normalizeOptions(normalized.children);
        }
        return normalized;
    })
};
