const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../backend/server')

describe('user API tests',function(){

    before(function() {
        server.start();
    });

    after(function(){
        server.close();
    })

    it('POST /register test',function(done){
        chai.request('http://localhost:5000')
        .post('/register')
        .send({
            username: 'test1', password: '1234'
        })
        .end(function(err,res){
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            done();
        })
    })
    
    it('POST /jwtLogin test',function(done){
        chai.request('http://localhost:5000')
        .post('/jwtLogin')
        .send({
            username: 'test1', password: '1234'
        })
        
        .end(function(err,res){
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        })
    })
})
