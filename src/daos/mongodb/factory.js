import ProductDaoMongo from "./productDao.js";
import TicketDaoMongo from "./ticketDao.js";
import { initMongoDB } from "./connection.js";
import UserDaoMongo from "./userDao.js";

let userDao;
let prodDao;
let ticketDao;

await initMongoDB();
userDao = new UserDaoMongo();
prodDao = new ProductDaoMongo();
ticketDao = new TicketDaoMongo();

export default { prodDao, userDao, ticketDao };
