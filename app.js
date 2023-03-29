import express, { urlencoded } from "express";
import BodyParser from "body-parser";
import cors from "cors";
import rateLimit from 'express-rate-limit';
import * as config from "./config.js"
import axios from "axios";


const AppKey =  "a99cc60fc2b34dbb18cb806b8a88ed14"
const MOVIE_URL = "https://api.themoviedb.org/3/search/movie";
const app = express()
app.use(rateLimit(config.default.rateLimiter()))
app.use(urlencoded({ extended: false }));
app.use(BodyParser.json())
app.use(cors())

app.get("/api/v1/search/movies", async(req, res)=>{
  const {query} = req;

  const remoteMovieResponse = await axios.get(`${MOVIE_URL}?api_key=${AppKey}&query=${query.query}`)
  const serialized_object = serializer(remoteMovieResponse.data.results)
  res.send(serialized_object)
})

const serializer = (data) => {  
 if(Array.isArray(data)){
  const results =  data.map(function(item){
    const serialized_item = {id: item.id, original_title:item.original_title, poster_path:item.poster_path
    } 
    return serialized_item
  });
  return results;
  }
 else {
  return { id, original_title, poster_path }
 }
}

app.use('*', function (req, res) {
  res.status(404).json({ body: "invalid route" })
})

export default app