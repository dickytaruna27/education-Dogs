const router = require("express").Router();
const authUser = require("../controller/authUser");
const Dogs = require("../controller/dogsController");
const errorHandler = require("../middleware/errorHandler");
const authentication = require("../middleware/authentication");
const upload = require("../helper/multer");

router.post("/register", authUser.Register);
router.post("/login", authUser.Login);
router.use(authentication);
router.get("/dogs", Dogs.readDataDogs);
router.post("/dogs", Dogs.createDataDog);
router.delete("/dogs/:id", Dogs.deleteDataDog);
router.post("/upload", upload.single("img"), Dogs.uploadImage);
router.use(errorHandler);

module.exports = router;
