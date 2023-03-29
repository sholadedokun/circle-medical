import v1Route from "./v1/index.js"
import {Router} from "express"

const api = Router()
api.get("/", (r,re)=>{
  re.json({message: "works"})
})
app.use('*', function (req, res) {
  res.status(404).json({ body: "invalid route from api" })
})
// api.use("/v1", v1Route)

export default api