import  express  from "express";
import morgan from "morgan";
const app = express();


//settings
app.set('port', 4000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

export default app 
