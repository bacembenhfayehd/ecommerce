const PORT = 4000; 
import express from 'express'
const app = express();
import multer from 'multer';
import path from 'path';
import cors from 'cors'
import mongoose from 'mongoose';
import userRoutes from './Routes/userRoutes.js'
import productRoutes from './Routes/productRoutes.js'
import { fileURLToPath } from 'url';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb+srv://bacem:NC4RqVnkO6Z7uKeE@cluster0.bumvmfi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Database is connected'))
  .catch(err => console.log('Database connection error:', err));
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'upload/images'));
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

app.use('/images', express.static(path.join(__dirname, 'upload/images')));

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    });
});


app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);


app.listen(PORT, (error) => {
    if (!error) {
        console.log('Server running on port ' + PORT);
    } else {
        console.log('Error:', error);
    }
});
