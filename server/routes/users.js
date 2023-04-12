import express from "express";
const router=express.Router();
import {
    getUser,
    getUserFriend,
    addRemoveFriend
} from "../controllers/user.js";
import { verfyToken } from "../middleware/auth.js";

/**
 *  @api {get} /users/:id Get a user using their id
 * @apiName Get user
 * @apiGroup aboutUser
 *  @apiHeader {String} Autharization Users unique access-key.
 * @apiError invalidUser  Token doesNotmatched
 * @apiSuccess {Object}  object detail of user
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  * { 
  *  "_id": "63c64e8ac962536c2fe3936d",
  *  "firstName": "ABHINAY",
  *  "lastName": "CHATURVEDI",
  *  "email": "abhinaychaturvedi@gmail.com",
  *  "picturePath": "to.jpg",
  *  "friends": [],
  *  "location": "fatanpur",
  *  "occupation": "dev",
  *  "viewedProfile": 45,
  *  "impressions": 90,
  *  "createdAt": "2023-01-17T07:30:18.564Z",
  *  "updatedAt": "2023-01-20T07:18:01.844Z",
  *  "__v": 27
  *  }
 */
router.get("/:id",verfyToken,getUser);
/**
 *  @api {get} /users/:id/friends Get a user friend
 * @apiName Get userFriend
 * @apiGroup aboutUser
 *  @apiHeader {String} Autharization Users unique access-key.
 * @apiError invalidUser  Token doesNotmatched
 * @apiSuccess {Object[]}  ArrayOfFriend All friends
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
  * [
  * { 
  *  "_id": "63c64e8ac962536c2fe3936d",
  *  "firstName": "ABHINAY",
  *  "lastName": "CHATURVEDI",
  *  "picturePath": "to.jpg",
  *  "location": "fatanpur",
  *  "occupation": "dev",
  *  "viewedProfile": 45,
  *  "impressions": 90,
  *  }
  * ]
 */
router.get("/:id/friends",verfyToken,getUserFriend);
router.patch("/:id/:friendId",verfyToken,addRemoveFriend)

export default router