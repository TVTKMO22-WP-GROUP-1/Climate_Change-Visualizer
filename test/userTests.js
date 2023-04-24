const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../backend/server')
const url = 'http://localhost:5000';

let user = {
    username: 'test1',
    password: '1234'
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
        .delete('/deleteuser')
        .send(user)
        .end(function(err,res){
            res.should.have.status(401);
            done();
        })
    })
})     
