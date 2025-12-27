import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.test.js';
import { adoptionsService, petsService, usersService } from '../src/services/index.js';

describe('Adoptions Router - Functional tests', function(){
  beforeEach(()=>{
    // reset stubs
    adoptionsService.getAll = async ()=>[];
    adoptionsService.getBy = async ()=>null;
    adoptionsService.create = async ()=>({});

    usersService.getUserById = async ()=>null;
    usersService.update = async ()=>({});

    petsService.getBy = async ()=>null;
    petsService.update = async ()=>({});
  })

  it('GET /api/adoptions - should return list', async()=>{
    adoptionsService.getAll = async ()=>[{_id:'1', pet:'p1', owner:'u1'}];
    const res = await request(app).get('/api/adoptions');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status','success');
    expect(res.body.payload).to.be.an('array');
  })

  it('GET /api/adoptions/:aid - returns 404 when not found', async()=>{
    adoptionsService.getBy = async ()=>null;
    const res = await request(app).get('/api/adoptions/123');
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('status','error');
  })

  it('GET /api/adoptions/:aid - returns adoption when found', async()=>{
    adoptionsService.getBy = async ()=>({_id:'123', pet:'p1', owner:'u1'});
    const res = await request(app).get('/api/adoptions/123');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status','success');
  })

  it('POST /api/adoptions/:uid/:pid - user not found -> 404', async()=>{
    usersService.getUserById = async ()=>null;
    const res = await request(app).post('/api/adoptions/u1/p1');
    expect(res.status).to.equal(404);
  })

  it('POST /api/adoptions/:uid/:pid - pet not found -> 404', async()=>{
    usersService.getUserById = async ()=>({_id:'u1', pets:[]});
    petsService.getBy = async ()=>null;
    const res = await request(app).post('/api/adoptions/u1/p2');
    expect(res.status).to.equal(404);
  })

  it('POST /api/adoptions/:uid/:pid - pet already adopted -> 400', async()=>{
    usersService.getUserById = async ()=>({_id:'u1', pets:[]});
    petsService.getBy = async ()=>({_id:'p1', adopted:true});
    const res = await request(app).post('/api/adoptions/u1/p1');
    expect(res.status).to.equal(400);
  })

  it('POST /api/adoptions/:uid/:pid - success -> 200', async()=>{
    usersService.getUserById = async ()=>({_id:'u1', pets:[]});
    petsService.getBy = async ()=>({_id:'p1', adopted:false});
    let updatedUser;
    usersService.update = async (id,body)=>{ updatedUser = {id,body}; return updatedUser };
    petsService.update = async (id,body)=>({id,body});
    adoptionsService.create = async (obj)=>({id:'a1',...obj});
    const res = await request(app).post('/api/adoptions/u1/p1');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status','success');
  })

})
