//process.env.NODE_ENV = 'REST API TEST';

const chai = require("chai");
const should = chai.should();
const expect = chai.expect();
const chaiHttp = require("chai-http");

// importing our server
const server = require("../app.js");
var router = require("../routes/index");
// Import User Model
const User = require("../models/User.js");
// use chaiHttp for making the actual HTTP requests
chai.use(chaiHttp);


describe("e2e test : users API route", () => {
  // testing the user registration route

  describe("POST /api/users", () => {
    it("should register a new user", (done) => {
      chai
        .request(server)
        .post("/api/users")
        .send({
          user: {
            username: "luck",
            email: "luck_j@gmail.com",
            password: "luck123",
          },
        })
        .end((err, res) => {
          console.log("body: " + res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.user.should.have.property("username");
          res.body.user.should.have.property("email");
          res.body.user.should.have.property("token");
          done();
        });
    });

    it("should not register already registered user", (done) => {
      chai
        .request(server)
        .post("/api/users")
        .send({
          user: {
            username: "luck",
            email: "luck_j@gmail.com",
            password: "luck123",
          },
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have
            .property("username")
            .eq("is already taken.");
          res.body.errors.should.have.property("email").eq("is already taken.");
          done();
        });
    });
  });

  //Nicole's tests 
  describe ("GET /api/users", () => {
    it("It should get a user by id", (done) => {
      chai
      .request(server)
      .get('/api/users' + User.id)
      .send({
        user: {
          username: "nicole",
          email: "nic@gmail.com",
          password: "abc123",
        },
      })
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        expect(res.body).to.have.property('token').equal(User.id);
      })
      .catch(function (err) {
        throw err;
      });
      done();
    });
  });
});
