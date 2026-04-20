import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";


const getAllVideos = asyncHandler( async(req, res) => {

    const { userId } = req.query

    if([userId].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required!")
    }

    const videos = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "_id",
                foreignField: "owner",
                as: "videoOwner"
            }
        },
        {
            $project: {
                videoOwner: 1
            }
        }
    ])

    if(!videos?.length){
        throw new ApiError(404, "Videos doesn't exist")
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        videos,
        "Videos fetched successfully"
    ))

})

const uploadVideo = asyncHandler( async(req, res) => {
    
    const { title, description, duration } = req.body

    if([title, description, duration].some((field) => field?.trim() === "")){
        throw new ApiError(400,"All fields are required!");
    }

    const videoFilePath = req.files?.videoFile ? req.files?.videoFile?.[0]?.path : null;

    if(!videoFilePath){
        throw new ApiError(400, "Video file is required")
    }

    const thumbnailFilePath = req.files?.thumbnail ? req.files?.thumbnail?.[0]?.path : null;

    if(!thumbnailFilePath){
        throw new ApiError(400, "Thumbnail is required")
    }

    const videoFile = await uploadOnCloudinary(videoFilePath)
    const thumbnail = await uploadOnCloudinary(thumbnailFilePath)

    if(!videoFile){
        throw new ApiError(400, "Video failed to upload!")
    }

    if(!thumbnail){
        throw new ApiError(400, "Thumbnail failed to upload")
    }

    const video = await Video.create({
        videoFile: videoFile.url,
        thumbnail: thumbnail.url,
        title,
        description,
        duration,
        owner: req.user?._id
    })  

    if(!video){
        throw new ApiError(400, "Something went wrong while uploading the video")
    }
    
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            video,
            "Video uploaded successfully"
        )
    )
})

const getVideoById = asyncHandler( async(req, res) => {

    const { videoId } = req.params;

    if([videoId].some((field) => (field).trim() === "")){
        throw new ApiError(400, "videoId cannot be empty")
    }

    if(!videoId){
        throw new ApiError(400, "videoId is required");
    }

    const video = await Video.findById(videoId)

    if(!video){
        throw new ApiError(400, "The video you trying to search does not exist!")
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {
            requestedVideo: video
        },
        "Video based on your request!"
    ))
})



export {
    uploadVideo,
    getAllVideos,
    getVideoById
}