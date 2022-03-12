const request = require('supertest')
const { response } = require('../../app')
const app = require('../../app')

const { mongoConnect, mongoDisconnect } = require('../../config/db')

describe('Courses API', () => {
    beforeAll(async () => {
        await mongoConnect()
    })

    afterAll(async () => {
        await mongoDisconnect()
    })

    describe('Test Courses', () => {
        const user = {
            email: "john@gmail.com",
            password: "123456"
        }

        const coursesCompleteData = {
            title: "Full Stack Web Dev 3",
            description: "In this course you will learn all about the front end with HTML, CSS and JavaScript. You will master tools like Git and Webpack and also learn C# and ASP.NET with Postgres",
            weeks: 10,
            tuition: 8000,
            minimumSkill: "intermediate",
            scholarhipsAvailable: true
        }
        const coursesIncompleteData = {
            title: "Full Stack Web Dev 3",
            description: "In this course you will learn all about the front end with HTML, CSS and JavaScript. You will master tools like Git and Webpack and also learn C# and ASP.NET with Postgres",
            weeks: 10,
            minimumSkill: "intermediate",
            scholarhipsAvailable: true
        }

        test('It should respond with 200 success', async () => {
            const response = await request(app)
                .get('/api/v1/courses')
                .expect('Content-Type', /json/)
                .expect(200);
        })

        test('It should respond with 201 created', async () => {
            const response = await request(app)
                .post('/api/v1/courses')
                .send(coursesCompleteData)
                .expect('Content-Type', /json/)
        })

        test('It should respond with 400 created', async () => {
            const response = await request(app)
                .post('/api/v1/courses')
                .send(coursesIncompleteData)
                .expect('Content-Type', /json/)

                expect(response.body).toStrictEqual({
                    error: 'Missing required launch property'
                }) 
        })
    })
})

