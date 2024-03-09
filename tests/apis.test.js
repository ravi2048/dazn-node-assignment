const mongoose = require("mongoose");
const request = require("supertest");
const dotenv = require('dotenv');
dotenv.config();
const app = require("../app")


describe("GET /movies", () => {
    it("should return all movies", async () => {
        const res = await request(app).get("/movies");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe("POST /movies", () => {
    it("should add a movie", async () => {
        const res = await request(app).post("/movies").send({
            title: "test movie",
            genre: ["action"],
            rating: 4,
            streamingLink: "test url",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe("test movie");
    });
});

describe("PUT /movies/:id", () => {
    it("should update a movie", async () => {
        const res = await request(app)
            .put("/movies/65ec2bcd8b2c16bafbaf73f9")
            .send({
                title: "test movie updated"
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe("test movie updated");
    });
});

describe("DELETE /movies/:id", () => {
    it("should delete a movie", async () => {
        const res = await request(app).delete("/movies/65ec1f8b89f11dd34fa25828");
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /movies/search", () => {
    it("should return >=0 results", async () => {
        const res = await request(app).get("/movies/search?title=movie&genre=action");
        expect(res.statusCode).toBe(200);
        expect(res.body.result.length).toBeGreaterThanOrEqual(0);
    });
});

afterAll((done) => {
    mongoose.connection.close();
    done();
});