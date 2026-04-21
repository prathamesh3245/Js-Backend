import { Router } from "express";
import { uploadVideo, 
         getAllVideos,
         getVideoById,
         updateVideo } from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/uploadVideo").post(
    verifyJWT,
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1
        },
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]),
    uploadVideo
)

// secured routes
router.route("/").get(verifyJWT, getAllVideos)
router.route("/:videoId").get(verifyJWT, getVideoById)
router.route("/:videoId/updateVideo").patch(
    verifyJWT,
    upload.single("thumbnail"),
    updateVideo
)

export default router;