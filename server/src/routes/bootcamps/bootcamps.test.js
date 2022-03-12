const request = require('supertest')
const app = require('../../app')

const { mongoConnect, mongoDisconnect } = require('../../config/db')

describe('Bootcamps API', () => {
    beforeAll(async () => {
        await mongoConnect()
    })

    afterAll(async () => {
        await mongoDisconnect()
    })

    describe('Test Bootcamps', () => {

        const user = {
            email: "john@gmail.com",
            password: "123456"
        }

        test('It should respond with 200 success', async () => {
            const response = await request(app)
                .get('/api/v1/bootcamps')
                .expect('Content-Type', /json/)
                .expect(200);
        })

        test('It should respond with 201 created', async () => {
            const response = await request(app)
                .post('/api/v1/bootcamps')
                .auth({ email: user.email, password: user.password })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
        })
    })
})

