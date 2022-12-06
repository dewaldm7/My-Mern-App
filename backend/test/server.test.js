const express = require("express");
const request = require("supertest");
const app = require("express")();

describe("Test endpoints", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/api/users")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

app.get("/api/users", (req, res) => {
  res.status(200).send("Hello World!");
});
