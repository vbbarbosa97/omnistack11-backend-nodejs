const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {

    //vai executar antes de todos os testes
    beforeEach( async () => {
        await connection.migrate.rollback(); // limpa o banco para não popular o mesmo
        await connection.migrate.latest(); // executa as migrations, tudo isso no banco de teste
    })

    //vai executar depois de todos os testes
    afterAll( async () => {
        await connection.destroy();
    })

    //vai executar um teste na rota 'post' das ongs
    it('should be able to create new ONG', async () => {
        
        const response = await request(app)
            .post('/ongs')
            //.set('Authorization', 'id_valido') setando um header
            .send({
                name: "APAE2",
                email: "apae@gmail.com",
                whatsapp: "27998001916",
                city: "Vitória",
                uf: "ES"
            });
        
        expect(response.body).toHaveProperty('id'); // esta esperando que a resposta seja um ID
        expect(response.body.id).toHaveLength(8); // esta esperando que o ID tenha 8 caracteres
        
    });
})