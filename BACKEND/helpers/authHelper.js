import dotenv from 'dotenv';
import jwt from "jsonwebtoken"
import { redis } from '../lib/redis.js';
dotenv.config();

export const generateToken = (userId) => {
  const accesstokensecret = process.env.TOKEN_SECRET_KEY;
  const refreshtokensecret = process.env.REFRESH_TOKEN_SECRET_KEY;


  if (!accesstokensecret && !refreshtokensecret) {
    throw new Error("JWT secrets are missing from environment variables");
  }

  const accessToken = jwt.sign({userId} , accesstokensecret, {
    expiresIn: "1y"
  });

  const refreshToken = jwt.sign({userId} , refreshtokensecret, {
    expiresIn: "1y"
  });

  return { accessToken , refreshToken };
}


export const storeRefreshToken = async (userId,refreshToken) => {
  await redis.set(`refreshToken:${userId}`,refreshToken , "EX", 60 * 60 * 24 * 365)
}   



export const setCookies = async (res, refreshToken, accessToken) => {
 res.cookie("accessToken" , accessToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 60 * 60 * 24 * 365,
 }),
 res.cookie("refreshToken" , refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 60 * 60 * 24 * 365,
 })
}
