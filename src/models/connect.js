import { Sequelize } from "sequelize";
import configDb from "../config/connect_db.js";
const sequelize = new Sequelize(
  configDb.database, //tên database
  configDb.user, //tên người dùng
  configDb.pass, //mật khẩu người dùng
  {
    host: configDb.host, //địa chỉ host của Mysql dưới local
    port: configDb.port, //port của mysql
    dialect: configDb.dialect, //dialect để kết nối với database
  }
);

export default sequelize;
