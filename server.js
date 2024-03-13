const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDb = require('./config/connectDb');
const PORT = 4000;
const cors = require('cors');
require('dotenv').config();
const credentials = require('./middleware/credentials');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
const verifyJwt = require('./middleware/verifyJWT');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

connectDb();

app.use(logger);

app.use(bodyParser.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: true, parameterLimit: 50000}));
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// app.post('/upload', upload.single('file'), (req, res) => {
//   // Here you can process the uploaded file (req.file)
//   // and send a response back to the client
//   res.send('File uploaded successfully');
// });
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/refresh', require('./routes/api/refresh'));
app.use('/api/logout', require('./routes/api/Logout'));

/////////  JWT protected routes  ///////////

// app.use(verifyJwt);

app.use('/api/users', require('./routes/api/users'));
app.use('/api/library', require('./routes/api/library'));
app.use('/api/classroom', require('./routes/api/studyRoom'));
app.use('/api/librarysettings', require('./routes/api/librarySettings'));
app.use('/api/classsection', require('./routes/api/classSection'));
app.use('/api/attendance', require('./routes/api/attendance'));
app.use('/api/images', require('./routes/api/imageUpload'));
app.use('/api/timetable', require('./routes/api/timeTables'));
app.use('/api/lessonplanning', require('./routes/api/lessonPlanning'));
app.use('/api/marks', require('./routes/api/examMarks'));
app.use('/api/accounts', require('./routes/api/Accounts/accounts'));
app.use('/api/admission', require('./routes/api/Accounts/admissions'));
app.use('/api/certificates', require('./routes/api/PDFs/pdfRoutes'));
app.use('/api/transportation', require('./routes/api/transportation'));
app.use('/api/bulkuploads', require('./routes/api/BulkUploads'));
app.use('/api/payroll', require('./routes/api/Accounts/payrolls'));
app.use('/api/classmaterials', require('./routes/api/classMaterials'));
app.use('/api/school', require('./routes/api/School'));
app.use('/api/hostel', require('./routes/api/hostel'));
app.use('/api/messages', require('./routes/api/Notifications/notifications'));

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDb database');
  app.listen(PORT, () => console.log(`Port running on ${PORT}`));
});
