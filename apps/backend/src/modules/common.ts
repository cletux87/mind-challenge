export const getPagination = ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  if (page === undefined || size === undefined) {
    return {
      skip: 0,
      take: 999999,
    };
  }
  return {
    skip: page < 2 ? 0 : (page - 1) * size,
    take: size,
  };
};
