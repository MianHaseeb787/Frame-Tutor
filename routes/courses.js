const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course_controller');
const userController = require('../controllers/user_controller');
const { Upload } = require('filestack-js/build/main/lib/api/upload');
const multer = require("multer");


const storage = multer.diskStorage({
    destination: 'uploads/', // Replace with your desired destination directory
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
const upload = multer({ storage });


router.get('/', courseController.getAllCourses );
// router.get('/:userId', userController.fetchUser);
router.post('/create', upload.none(), courseController.createNewCourse);
router.post('/admin/upload-video', upload.array('video'),  courseController.uploadVideo);
router.get('/download/:videoId',   courseController.downloadVideo);   
router.delete('/delete-video/:handle',   courseController.deleteVideo);   


module.exports = router;

