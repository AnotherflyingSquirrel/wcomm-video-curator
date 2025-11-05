export function slugify(input) {
    return input
        .toLowerCase()
        .replace(/[^a-z0-9\s/+-]/g, '')
        .replace(/[\s/+]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}
