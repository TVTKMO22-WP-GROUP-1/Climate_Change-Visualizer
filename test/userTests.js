const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../backend');
chai.use(chaiHttp);

describe('user API tests',function(){

    it('create new user',function(done){
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
            
        }
    )
})
