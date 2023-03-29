import app from "./app.js"

app.listen(5001, (err) => {
  if(err){
    console.log(err, "Starting server")
  }
  else{
    console.log("Server started on :5001")
  }
})