'use strict';

const CommonController = require('../controllers/CommonController')
const cTypeJSON			=		require('../middlewares/cTypeJSON')
const cTypeMultiPart 	= 		require('../middlewares/cTypeMultiPart')

module.exports = function(app, Router){

	const router = new Router({ prefix: '/common/v1' });

	router.post('/get_details', cTypeJSON, CommonController.get_details);
	app.use(router.routes()).use(router.allowedMethods());
};