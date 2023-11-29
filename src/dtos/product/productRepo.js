import factory from "../../daos/mongodb/factory.js";
const { prodDao } = factory;
import ProductResDTO from "./productResDTO.js";
import ProductDTO from "./productReqDTO.js";

export default class ProductRepository {
    constructor(){
        this.dao = prodDao;
    }

    async getByIdDTO(id){
        try {
            const response = await this.dao.getById(id);
            return new ProductResDTO(response);
        } catch (error) {
            console.log(error);
        }
    }

    async createProdDTO(obj) {
        try {
          const prodDTO = new ProductDTO(obj);
          const response = await this.dao.create(prodDTO);
          return response;
        } catch (error) {
          console.log(error);
        }
    }
}


