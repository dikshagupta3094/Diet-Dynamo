import express from "express"
import { postQuery, viewQuery } from "../controllers/query.controller.js"

const router = express.Router();

router.post('/postQuery', postQuery);
router.get('/viewQuery', viewQuery);

export default router;