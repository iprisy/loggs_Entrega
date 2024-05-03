const express=require('express');
const mongoose=require('mongoose');
const cookieParser=require("cookie-parser");
const displayRoutes=require("express-routemap");
const passport=require("passport");

//Implementación interna
const authRoutes=require ('../src/routes/auth.routes')
const userRoutes=require ('../src/routes/user.routes')
const notesRoutes=require ('../src/routes/notes.routes')
const productRoutes=require ('../src/routes/product.routes')
const cartRoutes=require ('../src/routes/carts.routes');
const initializePassport = require('./config/pasport.config');
import emailRoutes from "./routes/email.routes.js";
import smsRoutes from './routes/sms.routes.js'
import { dynamicLogger } from "./utils/logger.js";
const app=express()

const PORT=5000;
const DB_HOST="127.0.0.1";
const DB_PORT=27017;
const DB_NAME="ProyectoFinal";

const MONGO_URL=`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//Añadir passwport function con estrategias


initializePassport();
app.use(passport.initialize());

//Base  Routes
app.use("/api/authentication", authRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/notes/", notesRoutes);
app.use(dynamicLogger);

app.get("/:input", (req, res) => {
  const { input } = req.params;
  req.logger.info("Petición GET recibida");
  req.logger.info({ user: `priscila`, input });
  app.get("/logger", (req, res) => {
    return res.send("Loggers");
  });
  app.get("/warn", (req, res) => {
    req.logger.warn("Petición GET recibida en WARM 2");
    req.logger.warn("Petición GET recibida en WARM 2 NEW");
    res.send("¡Hola mundo WARN!");
  });
  app.get("/errors", (req, res) => {
    try {
      throw new Error(`EXPLOTO NUESTRA API`);
    } catch (error) {
      req.logger.error(`Peticion con error ${error.message}`);
      return res.status(500).json({ ok: false, error: error.message });
    }
  });
  
    app.listen(PORT_APP, () => {
      displayRoutes(app);
       console.log(`Listening on ${PORT_APP}, enviroment: ${process.env.NODE_ENV}`);
      });
mongoose
.connect(MONGO_URL)
.then((con)=>{
    console.log("🚀 ~ file:23 ~ mongoose.connect - OK")
})
.catch((err)=>{
    console.log ("Error: ", err)
})

app.listen(PORT, ()=>{
    displayRoutes(app);
    console.log("🚀 ~ app.js 31 ~ PORT:", PORT);
    
})
    console.log("🚀 ~ app.listen ~ app:", app)
    console.log("🚀 ~ app.listen ~ displayRoutes:", displayRoutes)
    app.use("/static", express.static(`${process.cwd()}/public`));
    app.use(`/api/email`, emailRoutes);
    //app.use("/api/sms", smsRoutes);
    
    app.listen(PORT_APP, () => {
      displayRoutes(app);
      console.log(`api up and runing on port ${PORT_APP}`);
    });