const request = require('supertest');
const express = require('express');
const  app  = require('./app');

const testapp = express();
testapp.use(express.json());
testapp.use('/', app);

describe('API Tests', () => {
  it('should get a list of users', async () => {
    const response = await request(testapp).get('/Users/get');
    expect(response.status).toBe(200);
  });

  it('should add a user', async () => {
    const userData = {
      email: 'test@divum.in',
      fname: 'nodejs',
      lname: 'test',
      mobile: '1234567890',
      dob: '2000-01-01',
      address: 'Banglore',
    };

    const response = await request(testapp)
      .post('/Users/add')
      .send(userData);
    expect(response.status).toBe(200);
  });

  it('should update a user', async () => {
    const userData = {
      email: 'test@divum.in',
      fname: 'Updated',
      lname: 'Name',
      mobile: '9876543210',
      dob: '2000-01-02',
      address: 'Banglore',
    };

    const response = await request(testapp)
      .post('/Users/update')
      .send(userData);
    expect(response.status).toBe(200);
  });

  it('should find a user', async () => {
    const email = 'test@divum.in';

    const response = await request(testapp)
      .get(`/Users/get/${email}`)
      .expect(200);
  });

  it('should delete a user', async () => {
    const email = 'test@divum.in';

    const response = await request(testapp)
      .delete(`/Users/${email}`)
      .expect(200);
  });
});
