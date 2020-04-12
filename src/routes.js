const {Router} = require('express');
const { celebrate, Segments, Joi} = require('celebrate');

//Controller
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
    
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })

}), OngController.store);

routes.post('/incidents', celebrate({

    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),

}), IncidentController.store);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', celebrate({

    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })

}), IncidentController.delete);

routes.get('/profile', celebrate({

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),

}), ProfileController.index);

routes.post('/session', celebrate({

    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })

}),SessionController.store);

module.exports = routes;