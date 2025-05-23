import path from 'path'
import multer from 'multer'

const upload = multer({
    dest:'uploads/',
    limits:{fileSize:50*1024*1024},
    storage:multer.diskStorage({
        destination:'uploads/',
        filename:(_req,file,cb)=>{
            cb(null,file.originalname)
        },
    }),
    fileFilter: (_req, file, cb)=>{
        let ext = path.extname(file.originalname);

        if( ext !== ".jpg" &&
            ext !== ".jpeg" &&
            ext !== ".Webpg" &&
            ext !== ".png" &&
            ext !== ".mp4" &&
            ext !== ".pdf"
        ){
            cb(new Error(`Unsupport file type ${ext}`),false)
            return
        }

        cb(null, true);
    }
})

export default upload


