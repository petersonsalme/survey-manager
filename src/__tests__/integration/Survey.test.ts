import request from "supertest";
import { app } from "../../app";
import createConnection from '../../database'

describe('Surveys', async () => {

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = await createConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it('should create new survey', async () => {
        const response = await request(app).post('/surveys').send({
            title: 'title',
            description: 'description'
        });

        expect(response.status).toBe(201);

        expect(response.body).toHaveProperty('id');

        expect(response.body).toHaveProperty('title');
        expect(response.body.title).toBe('title');

        expect(response.body).toHaveProperty('description');
        expect(response.body.description).toBe('description');

        expect(response.body).toHaveProperty('created_at');
    });

    it('should list surveys', async () => {
        const response = await request(app).get('/surveys');

        expect(response.status).toBe(200);

        expect(response.body.length).toBe(1);
        expect(response.body[0].title).toBe('title');
        expect(response.body[0].description).toBe('description');
    });

});
