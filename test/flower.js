process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
describe('Flowers', () => {
    beforeEach((done) => {
        //Before each test we empty the database in your case
        done();
    });
    /*
     * Test the /GET route
     */
    describe('/GET flowers', () => {
        it('it should GET all the flowers', (done) => {
            chai.request(server)
                .get('/flowers')
                .end((err, res) => {
                    res.should.have.status(200);
                    const data = res.body;
                    data.should.be.a('array');
                    data.length.should.be.eql(10);
                    done();
                });
        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST flowers', () => {
        it('it should POST a flower', (done) => {
            let flower = {
                name: "Iris",
                amount: 21
            };
            chai.request(server)
                .post('/flowers')
                .send(flower)
                .end((err, res) => {
                    res.should.have.status(200);
                    const data = res.body;
                    data.should.be.a('object');
                    data.should.have.property('message').eql('Flower successfully added!');
                    data.data.should.have.property('id');
                    data.data.should.have.property('name').eql(flower.name);
                    data.data.should.have.property('amount').eql(flower.amount);
                    done();
                });
        });

        it('it should not POST a book without status field', (done) => {
            let flower = {
                name: "Iris"
            };
            chai.request(server)
                .post('/flowers')
                .send(flower)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql("Flower is invalid!");
                    done();
                });
        });
    });

    /*
     * Test the /GET/:id route
     */
    describe('/GET/:id flowers', () => {
        it('it should GET a flower by the given id', (done) => {
            // TODO add a model to db then get that id to take this test
            const id = '2973a8bd-f9e3-4cea-9ca2-2c45d2dc7a73';
            chai.request(server)
                .get('/flowers/' + id)
                .end((err, res) => {
                    res.should.have.status(200);                    
                    const data = res.body;
                    data.should.be.a('object');
                    data.should.have.property('data');
                    data.data.should.have.property('id').eql(id);
                    data.data.should.have.property('name');
                    data.data.should.have.property('amount');
                    done();
                });
        });
    });

    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id flowers', () => {
        it('it should UPDATE a flower given the id', (done) => {
            // TODO add a model to db then get that id to take this test
            const id = '2973a8bd-f9e3-4cea-9ca2-2c45d2dc7a73';
            chai.request(server)
                .put('/flowers/' + id)
                .send({
                    name: "Iris",
                    amount: 123
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');                
                    const data = res.body;
                    data.should.have.property('data');
                    data.data.should.have.property('name').eql("Iris");
                    data.data.should.have.property('amount').eql(123);
                    done();
                });
        });
    });

    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id flowers', () => {
        it('it should DELETE a flower given the id', (done) => {
            // TODO add a model to db then get that id to take this test
            const id = '2973a8bd-f9e3-4cea-9ca2-2c45d2dc7a73';
            chai.request(server)
                .delete('/flowers/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');   
                    const data = res.body;
                    data.should.have.property('message').eql('Flower successfully deleted!');
                    data.should.have.property('data');
                    data.data.should.have.property('length').eql(1);
                    done();
                });
        });
    });
});