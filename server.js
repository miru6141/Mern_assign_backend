import express from 'express'
import cors from 'cors';
import bodyParser from'body-parser'
import mongoose from 'mongoose';
import userModal from './userModal.js';


const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: 'https://assignmentmern121.netlify.app',
    }
       
))

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect('mongodb+srv://miru6141:zd3kjRtS3Ct17TS5@cluster0.nlemmqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.post('/user', async (req, res, next) => {
   
      const { email,name,age } = req.body;
  
      // Find user by email and return name and age
      const userData = await userModal.create({
          
        email,
        name,
        age,

      })

      res.status(200).json({
        message: 'User details found',
        user: userData,
      });
    })
     


app.get('/getuserdata', async (req, res, next) => {
    try {
      const { email } = req.query;
      console.log(email);
  
      // Find user by email and return name and age
      const getData = await userModal.findOne({ email }).select('name age email');
  
      if (!getData) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
  
      res.status(200).json({
        message: 'User details found',
        user: getData,
      });
    } catch (error) {
      next(error);
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
