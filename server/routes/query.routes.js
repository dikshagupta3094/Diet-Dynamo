import express from "express"
import { postQuery, viewQuery } from "../controllers/query.controller.js"
import {isLoggedIn} from "../middleware/auth.middleware.js"
const query = express.Router();

query.post('/postQuery/:expertId',isLoggedIn, postQuery);
query.get('/viewQuery',isLoggedIn, viewQuery);

export default query;