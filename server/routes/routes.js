import express from "express";
import { Creatuser } from "../controllers/UserController.js";

const routers=express.Router();

routers.post('./create',Creatuser )