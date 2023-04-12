import express from "express"
import {
    getFeedPosts,
    getUserPosts,
    likePost
} from "../controllers/posts.js"
import { verfyToken } from "../middleware/auth.js";
const router=express.Router();
/**
 *  @api {get} /posts Get all the feedPost
 * @apiName All feedPost
 * @apiGroup All About feedPost
 *  @apiHeader {String} Autharization Users unique access-key.
 * @apiError invalidUser  Token doesNotmatched
 * @apiSuccess {Object[]}  ArrayOfPost All posts 

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * [
  *  {
  *      "_id": "63c9431ca37885d4beade3ea",
  *      "userId": "63c64e8ac962536c2fe3936d",
  *      "firstName": "ABHINAY",
  *      "lastName": "CHATURVEDI",
  *      "location": "fatanpur",
  *      "description": "sgsdrg",
  *      "userPicturePath": "to.jpg",
  *      "likes": {},
  *      "comments": [],
  *      "createdAt": "2023-01-19T13:18:20.053Z",
  *      "updatedAt": "2023-01-19T13:18:20.053Z",
  *      "__v": 0
  *  },
  *  {
  *      "_id": "63ca2d849c7651f20f080a51",
  *      "userId": "63c64e8ac962536c2fe3936d",
  *      "firstName": "ABHINAY",
  *      "lastName": "CHATURVEDI",
  *      "location": "fatanpur",
  *      "description": "Hello kailash how are you",
  *      "picturePath": "website ss.jpg",
  *      "userPicturePath": "to.jpg",
  *      "likes": {
  *          "63c64e8ac962536c2fe3936d": true
  *      },
  *      "comments": [],
  *      "createdAt": "2023-01-20T05:58:28.272Z",
  *      "updatedAt": "2023-01-20T05:58:41.338Z",
  *      "__v": 0
  *  }
  * ]
 */

router.get("/",verfyToken,getFeedPosts);
/**
 *  @api {get} /posts/:userId/posts Get all the feedPost of particular user 
 * @apiName All feedPost of particular user
 * @apiGroup All About feedPost
 *  @apiHeader {String} Autharization Users unique access-key.
 * @apiParam {String} userId Users unique ID.
 * @apiError invalidUser  Token doesNotmatched
 * @apiSuccess {Object[]}  ArrayOfPost All posts 

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * [
  *  {
  *      "_id": "63ca2d849c7651f20f080a51",
  *      "userId": "63c64e8ac962536c2fe3936d",
  *      "firstName": "ABHINAY",
  *      "lastName": "CHATURVEDI",
  *      "location": "fatanpur",
  *      "description": "Hello kailash how are you",
  *      "picturePath": "website ss.jpg",
  *      "userPicturePath": "to.jpg",
  *      "likes": {
  *          "63c64e8ac962536c2fe3936d": true
  *      },
  *      "comments": [],
  *      "createdAt": "2023-01-20T05:58:28.272Z",
  *      "updatedAt": "2023-01-20T05:58:41.338Z",
  *      "__v": 0
  *  }
  * ]
 */
router.get('/:userId/posts',verfyToken,getUserPosts);

router.patch("/:id/like",verfyToken,likePost)





export default router;