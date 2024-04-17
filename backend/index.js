const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const pinsRoutes = require('./routes/pins.js')
const usersRoutes = require('./routes/users.js')
const languageRoutes = require('./routes/language.js');
const cookieParser = require('cookie-parser');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const Backend = require('i18next-fs-backend'); // File system backend
const { checkUser } = require('./middleware/authMiddleware.js');
const app=express();


i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'sr', 
    backend: {
      loadPath:(lng)=>{
        return './locales/{{lng}}/translation.json'
      } 
    },
  },(err,t)=>{
    if(err){
      console.log(err);
    }else{
      console.log(t('user_not_found'))
    }
  });
app.use(i18nextMiddleware.handle(i18next));
app.use(cookieParser());
app.use(cors({
  origin:'react-js-and-vue-js-api.vercel.app',
  methods:['POST', "GET"],
  credentials:true
}));
dotenv.config();
app.use(express.json())
mongoose.connect(process.env.MONGO_URL)
.then((res)=>{
    app.listen(8800)
}).catch((err)=>{
    console.log(err ,'err');
})

app.use('/',languageRoutes)
app.use('/api/pins',pinsRoutes)
app.use('/api/users',checkUser,usersRoutes)