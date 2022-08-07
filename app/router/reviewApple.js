'use strict';

const ReviewAppleController =   require('../controllers/ReviewAppleController')
const cTypeJSON			=		require('../middlewares/cTypeJSON')
const cTypeMultiPart 	= 		require('../middlewares/cTypeMultiPart')

module.exports = function(app, Router){

	const router = new Router({ prefix: '/apple/appstore/v1' });

	router.post('/get_reviews', cTypeJSON, ReviewAppleController.get_reviews);
	app.use(router.routes()).use(router.allowedMethods());
}