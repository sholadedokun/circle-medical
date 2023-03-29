import request from 'supertest'
import app from "./app"
import axios from "axios"
import sinon from 'sinon'


describe("/", ()=> {
  // xtest("should respond with a 200 status code", async()=> {
  //   const response = await request(app)
  //     .get("/")
  //     .set('Accept', 'application/json')
  //   expect(response.statusCode).toBe(200)
  // })
  describe("/api/v1/search/movies", ()=> {
    describe("When there is a query string", ()=>{
      describe("when there are responses",()=>{
        const fakeResultObj = {
          data:{
            results: [{
              id:1,
              original_title: "Jack Reacher",
              poster_path: "/uQBbjrLVsUibWxNDGA4Czzo8lwz.jpg",
              something:"elessee"
            },
            {
              id:1,
              original_title: "Jack Reacher",
              poster_path: "/uQBbjrLVsUibWxNDGA4Czzo8lwz.jpg",
              something:"elessee"
            }
          ]
          },
          api: "some other objects"
        }
        const expectedResult =  [{
            "id":1,
            "original_title": "Jack Reacher",
            "poster_path": "/uQBbjrLVsUibWxNDGA4Czzo8lwz.jpg"
          },
          {
            "id":1,
            "original_title": "Jack Reacher",
            "poster_path": "/uQBbjrLVsUibWxNDGA4Czzo8lwz.jpg"
          }
        ];

        sinon.stub(axios, "get").returns(fakeResultObj)
        test("should return serialiazed", async()=>{
          const response = await request(app)
          .get("/api/v1/search/movies/?query='jack'")
          .set('Accept', 'application/json')
          expect(response.statusCode).toBe(200)
          expect(JSON.parse(response.text)).toEqual(expectedResult)
        })
      })
    })
  })

})

describe("Invalid app routes", ()=> {
  test("should respond with a 404 status code", async()=> {
    const response = await request(app).get("/route/v1/books")
    expect(response.statusCode).toBe(404)
  })
})