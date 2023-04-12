import express   from "express";
import {login} from "../controllers/auth.js"
const router=express.Router();

/**
 *  @api {post} /auth/login Login to user in website
 * @apiName LoginUser
 * @apiGroup Login
 *  @apiBody {String} email  user email
 * @apiBody {String} password user password
 * @apiError UserDoesNotexist The <code>email</code> of the User was not found.
 * @apiError invalidCredentials  password does not match
 * @apiSuccess {String}  Token  Token information.
 * @apiSuccess {Object}  profile  User information.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzY0ZThhYzk2MjUzNmMyZmUzOTM2ZCIsImlhdCI6MTY3NDIyMTk2OH0.dK5_3DRQVf2QkqEBVP8EAI3OKULqCdRbCkzK3O9jtqg",
 *   "user": {
 *       "_id": "63c64e8ac962536c2fe3936d",
 *       "firstName": "ABHINAY",
 *       "lastName": "CHATURVEDI",
 *       "email": "abhinaychaturvedi@gmail.com",
 *       "picturePath": "to.jpg",
 *       "friends": [],
 *       "location": "fatanpur",
 *       "occupation": "dev",
 *       "viewedProfile": 45,
 *       "impressions": 90,
 *       "createdAt": "2023-01-17T07:30:18.564Z",
 *       "updatedAt": "2023-01-20T07:18:01.844Z",
 *       "__v": 27
 *     }
 *    }
 */

router.post("/login",login);
export default router;