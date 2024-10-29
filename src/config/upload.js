// bước 1: cài npm i multer
// Bước 2: bắt đầu tạo file upload
import multer, { diskStorage } from "multer";

// process.cwd() : trả về đường dẫn root của project

export const upload = multer({
  storage: diskStorage({
    destination: process.cwd() + "/public/imgs",
    filename: (req, file, callback) => {
      // timestamp_img_name
      let newName = new Date().getTime() + "_" + file.originalname; //getTime 10 - 15 ký tự
      callback(null, newName); // null: nếu có lỗi, newName: tên file mới
    },
  }),
});
