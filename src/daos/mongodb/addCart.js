export default getAllProdWithPagesDeep = {
  limit = 2,
  sortOrder = "asc",
  page = 1,
} =
  {};
  const response = await productModel.paginate(
    {},
    {
      page,
      limit,
      sort: { price: sortOrder },
    }
  );

  response;
