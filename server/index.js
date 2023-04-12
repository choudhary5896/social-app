import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors  from "cors";
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan";
import path from "path"
import { fileURLToPath } from "url";
import {register} from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js"
import {createPost} from "./controllers/posts.js";
import postRoutes from "./routes/post.js"
import { verfyToken } from "./middleware/auth.js";


//  confuguration of middleware and packages
//  middlewares?these are the fuction that run
// between the some task that we need to perform 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app=express();
// app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use("/assets",express.static(path.join(__dirname,'public/assets')));
console.log(path.join(__dirname,'public/assets'))
app.use(cors());
//file storage 
const storage =multer.diskStorage({
    destination:function(req,file,cb){
        console.log(file);
        cb(null,"public/assets");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload=multer({storage});
/**
 *  @api {post} /auth/register register user in website
 * @apiName registerUser
 * @apiGroup Register
 *  @apiBody {String} firstName  user name
 * @apiBody {String} lastName user lastname
 * @apiBody {String} location user location
 * @apiBody {String} occupation user occupation
 * @apiBody {String} email user email
 * @apiBody {String} password user password
 * @apiBody {String} picturePath user password
 */
app.post("/auth/register",upload.single("picture"),register);
app.post("/posts",verfyToken,upload.single("picture"),createPost);
/* ROUTES */
app.use("/auth",authRoutes);
/*  user routes */
app.use("/users",userRoutes);
/*  post routes */
app.use("/posts",postRoutes);
//mongoose setup
const port=process.env.PORT || 6001;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.Mongo_URL).then(()=>{
    app.listen(port,()=>console.log(`server Port:${port}`));
}).catch((e)=>console.log(`${e} did not connect`));


