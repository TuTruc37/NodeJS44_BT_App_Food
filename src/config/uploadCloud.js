import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
// thư trung gian
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}); // kết nối cloudinary trên server đó

// cấu hình cho multer lưu trưc file vào cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatar", //define folder trên cloudinary nếu có rồi thì tạo trên cloudinary nếu không có thì exno đi
    format: async (req, file) => {
      // định nghĩa những file image cho phép
      const validImgFormat = ["png", "jpg", "jpeg", "gif", "webp", "heic"];

      // lấy định dạng file hình từ file
      //abc.jpg
      // mimetype: 'image/jpeg'
      const fileFormat = file.mimetype.split("/")[1];
      // kiểm tra định dạng file có hợp lệ không
      if (validImgFormat.includes(fileFormat)) {
        return fileFormat;
      }
      return ".png";
    }, // async đợi file để gửi lên local
    transformation: [
      {
        width: 800, // giới hạn chiều rộng ảnh
        quality: "auto:good", // chất lượng tự động:  tốt
        fetch_format: "auto", //tự động chọn định dạng tốt nhất (webp, png,....)
      },
    ],
    public_id: (req, file) => file.originalname.split(".")[0], // define tên hình
  },
});

// khởi tạo multer với cloudinary storage
export const uploadCloud = multer({ storage }); //storage trung tên nên dùng {} chứ không trùng tên thì là ..
