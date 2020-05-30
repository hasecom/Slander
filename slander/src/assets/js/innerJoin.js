export const innerJoin = (xs, ys, sel) =>
xs.reduce((zs, x) =>
ys.reduce((zs, y) =>
zs.concat(sel(x, y) || []),
zs), []);
