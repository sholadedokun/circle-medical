import { Router } from "express";
const movies = Router()
movies.use("/", (req, res)=>{
  res.status(200).json({message: "works"})
})

export default movies