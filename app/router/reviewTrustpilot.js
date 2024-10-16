'use strict';

const ReviewTrustpilotController =   require('../controllers/ReviewTrustpilotController')
const cTypeJSON			=		require('../middlewares/cTypeJSON')
const cTypeMultiPart 	= 		require('../middlewares/cTypeMultiPart')

module.exports = function(app, Router){

	const router = new Router({ prefix: '/trustpilot/web/v1' });

	router.post('/get_reviews', cTypeJSON, ReviewTrustpilotController.get_reviews);
	app.use(router.routes()).use(router.allowedMethods());
}