import multer from "multer";
import path from "path";
import { HttpError } from "../helpers/index.js";
import dotenv from "dotenv";


dotenv.config();

const destination = path.resolve("temp");


const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniquePrefix}_${file.originalname}`;
        /*if (filename === null) {
            throw err (HttpError(400, "No file attached"));
        };*/
        cb(null, filename); 
    }
});


const limits = {
    fileSize: 5 * 1024 * 1024,
};


const fileFilter = (req, file, cb) => {
    const extention = file.originalname.split(".").pop();
    if (extention === "exe") {
        return cb(HttpError(400, "Invalid file extention"));
    }
    cb(null, true);
};



const upload = multer({
    storage,
    limits,
    fileFilter,
});

export default upload;
