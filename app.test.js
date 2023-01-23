const { expectCt } = require('helmet');
const supertest = require('supertest');
const app=require("./server");
const request = supertest(app);

// TODO VOUCHER TEST CASES
describe("get-voucher", () => {
    it("should return 200 and all vouchers", async () => {
      const res = await request.get("/voucher/get-voucher");
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Voucher get successfully");
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(typeof res.body).toBe('object');
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

describe("post-voucher", ()=> {
    it("should create voucher", async() =>{
      const formData={
      code:"MTSD12",
      discount:12,
      voucherName:"Gaana"}
      const res=await request.post("/voucher/create-voucher")
      .send(formData);
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('Voucher created successfully');
      expect(typeof res.body).toBe('object');
    })
    it("should not create voucher", async() =>{
      const formData={
      discount:12,
      voucherName:"samsung"}
      const res=await request.post("/voucher/create-voucher")
      .send(formData);
      expect(res.statusCode).toBe(400);
    })
  })

describe("update-voucher",()=>{
    it("should update voucher", async()=>{
      const formData={
        code:"MTSD12",
        discount:12,
        voucherName:"Gaana"}
      const res=await request.patch("/voucher/update-voucher/3")
      .send(formData);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Voucher updated successfully')
    })
  })

describe("delete-voucher",()=>{
    it("should delete voucher", async()=>{
      const res=await request.delete("/voucher/delete-voucher/3")
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Voucher deleted successfully')
    })
  })
  


// TODO USER TEST CASES
describe("get-user",()=>{
  it("should get user",async()=>{
    const res=await request.get("/user");
    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.message).toBe('User get successfully');
  })
})

describe("create-user",()=>{
  const userData={
    "phone":9967698036,
    "password":"myPassWord",
    "name":"shivam singh"
}
  it("should create user",async()=>{
    const res=await request.post("/user")
    .send(userData)
    expect(res.statusCode).toBe(200);
  
  })
  it("should not create user",async()=>{
    const userData={
      "name":"shivam singh"}
    const res=await request.post("/user")
    .send(userData);
    expect(res.statusCode).toBe(422);
  })
  it("should not craete user with empty password",async()=>{
    const res=await request.post("/user")
    .send({password:""});
    expect(res.statusCode).toBe(422);
  })
})

describe("update-user",()=>{
  const formData={"name":"newName"}
  it("should update-user",async()=>{
    const res=await request.patch("/user/4")
    .send(formData)
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User updated successfully');
  })
  it("should not update-user",async()=>{
    const res=await request.patch("/user/4")
    .send({id:3})
    expect(res.statusCode).toBe(422);
    expect(res.body.message).toBe(`userId can't be update`)
  })
  it("should not update-userr",async()=>{
    const res=await request.patch("/user/4")
    .send({password:""});
    expect(res.statusCode).toBe(422);
    expect(res.body.message).toBe(`password should not be empty`)
  })
})

describe("delete-user",()=>{
  it("should user delete",async()=>{
    const res=await request.delete("/user/5")
    .send({is_Deleted:true})
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User deleted successfully')
  })
})