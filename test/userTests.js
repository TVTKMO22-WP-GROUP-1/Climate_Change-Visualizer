const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../backend/visuals')
const should = chai.should();
const Constants = require('../frontend/climateapp/src/Constants.json') 
const url = Constants.API_ADDRESS;

let user = {
    username: 'testUser',
    password: 'testUser'
}

describe('User API tests',function(){
    before(function() {
        server.start();
    });
    after(function(){
        server.close();
    })
    
    it('POST /register test',function(done){
        chai.request(url)
        .post('/register')
        .send(user)
        .end((err,res) => {
            res.should.have.status(201);
            done();
        })
    })

    it('POST /jwtLogin test',function(done){
        chai.request(url)
        .post('/jwtLogin')
        .send(user)
        .end((err,res) => {
            res.should.have.status(401);
            done();
        })
    })

    it('DELETE /deleteuser test',function(done){
        chai.request(url)
        .delete('/users/'+user)
        .send(user)
        .end(function(err,res){
            res.should.have.status(201);
            done();
        })
    })
})     