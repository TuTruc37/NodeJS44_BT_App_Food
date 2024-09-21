import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    "Node44_youtube",//tên database
    "root",//tên người dùng
    "123456",//mật khẩu người dùng
    {
        host: "localhost",//địa chỉ host của Mysql dưới local
        port: 3307, //port của mysql
        dialect: "mysql",//dialect để kết nối với database
    }
);

export default sequelize;