'use strict';

const ReviewAndroidController = require('../controllers/ReviewAndroidController')
const cTypeJSON			=		require('../middlewares/cTypeJSON')
const cTypeMultiPart 	= 		require('../middlewares/cTypeMultiPart')

module.exports = function(app, Router){

	const router = new Router({ prefix: '/android/playstore/v1' });

	router.post('/get_reviews', cTypeJSON, ReviewAndroidController.get_reviews);
	app.use(router.routes()).use(router.allowedMethods());
};