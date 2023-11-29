import ProductService, * as service from "../services/productServices.js";

export const getAllCtl = async (req, res, next) => {
  try {
    const { limit, page, sort } = req.query;
    const response = await service.getAllProdWithPages({
      limit,
      page,
      sort,
    });
    // DIRECCIONADO a SERVICIOS
    res.status(200).json({ response });
  } catch (error) {
    next(error.message);
  }
};
export const getByIdCtl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.getById(id);
    if (!product)
      res.status(404).json({ message: "Product not found CONTROLLER TRIGGER" });
    else res.json(product);
  } catch (error) {
    next(error.message);
  }
};
export const updateCtl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = await service.update(id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    next(error.message);
  }
};
export const createCtl = async (req, res, next) => {
  try {
    // const {name, price, description, stock} = req.params;
    const createdProduct = await service.create(req.body);
    if (!createdProduct)
      res.status(400).json({ message: "Something happen.." });
    else res.json(createdProduct);
  } catch (error) {
    next(error.message);
  }
};
export const removeCtl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProduct = await service.erase(id);
    res.json(deleteProduct);
  } catch (error) {
    next(error.message);
  }
};

// MOCKS

export const createProduct = async (req, res) => {
  try {
    const { cant } = req.query;
    const response = await service.createProdMock(cant);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const response = await service.getProducts();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};
