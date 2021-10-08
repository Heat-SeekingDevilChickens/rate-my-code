const db = require('../server/models/models');
const path = require('path');
const supertest = require('supertest');

describe('db unit tests', () => {
    
  beforeAll((done) => {
    const query = `
      DROP TABLE users;
      CREATE TABLE users (
        _id SERIAL PRIMARY KEY,
        username varchar(255),
        password varchar(255)
        );
      `
    db.query(query);
    done();
  })

  afterAll((done) => {
    const query = `
       DELETE  
       FROM users; 
      `
    db.query(query);
    done();   
  })

//Test whether addUser adds a valid user and returns error if invalid
describe('addUser'), () => {
  it('adds user to db without error', () => {
    
    const testArr = ['usertest', 'passwdtest'];
    
    const query = {
      text: `
    INSERT INTO users
    VALUES ($1, $2);
     `,
      params: testArr
    };

   const result = db.query(query.text, query.params);
   expect(result).not.toBeInstanceOf(Error);
   console.log('result: ', result);

  
   //const userQuery = `SELECT * FROM users;`

  

   expect

  })
}

//test whether addComment adds valid comment and returns error if invalid

//Test whether getPost retrieves correct post with associated comments


})