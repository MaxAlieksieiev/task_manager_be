import express from "express";
import { checkDuplicateEmail } from '../middlewares';
import { signIn, signUp, refreshToken} from "../controllers";

export const router = express.Router();

router.post('/signup',
    [checkDuplicateEmail],
    signUp,
);

router.post('/signin', signIn);

router.post('/refresh-token', refreshToken);
