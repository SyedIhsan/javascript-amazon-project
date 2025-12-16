function formatCurrency(priceCents) {
    return (priceCents / 100).toFixed(2);
};

export default formatCurrency; // Each file can only have 1 default export