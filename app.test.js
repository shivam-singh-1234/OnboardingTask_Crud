const supertest = require('supertest');
const baseURL = "http://localhost:8000";
const app=require("./server");
const request = supertest(app);

// describe('Space test suite', () => {
//     it('adds 1 + 2 to equal 3', () => {
//         expect(1 + 2).toBe(3);
//       });
// })


describe("voucher", () => {
    it("should return all vouchers", async () => {
      const res = await request.get("/voucher/get-voucher");
      console.log(res.statusCode,res.body.length)
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it("should create vouchers", async () => {
        const res=await request.post("/voucher/create-voucher").send({ code:"API21000",discount:19});
        expect(res.statusCode).toBe(200);

    })

  });














// describe("GET /voucher/get-voucher", () => {
//     it("should return all products", async () => {
//       const res = await request(app).get("/voucher/get-voucher");
//       expect(res.statusCode).toBe(200);
//       expect(res.body.length).toBeGreaterThan(0);
//     });
//   });

// describe('POST /voucher/create-voucher', () => {
//   it('should create a new user', async () => {
//     // const res = await request(app)
//     app
//       .post('localhost:8000/voucher/create-voucher')
//       .send({ code:"API30322",discount:2 });

//     expect(res.status).toBe(201);
//     expect(res.body).toEqual({ message: 'User created successfully' });
//   });
// });

// describe('Space test suite', () => {
//     it('My Space Test', () => {
//         expect(true).toEqual(true);
//     });
// });
