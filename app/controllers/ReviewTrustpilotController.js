'use strict';
const Joi = require('joi'); // Ensure Joi is imported
const ReviewTrustpilot = require('../models/ReviewTrustpilot');

exports.get_reviews = async function(ctx) {
    const schema = Joi.object({ 
        url: Joi.string().uri().required(), // Validate as a URL
        browser: Joi.string(),
        browser_unique_id: Joi.string(),
        location: Joi.string() 
    }); 

    const validation = schema.validate(ctx.request.body);
  
    if (validation.error) {
        // Throwing an error with a status code and message
        ctx.throw(400, `ValidationError: ${validation.error.details[0].message.replace(/"/g, '')}`);
    }

    const params = {
        url: ctx.request.body.url,
        browser: ctx.request.body.browser || "Unknown",
        browser_unique_id: ctx.request.body.browser_unique_id || "unknown_browser_id",
        location: ctx.request.body.location || "Unknown"
    };

    try {
        const reviewsResponse = await ReviewTrustpilot.getInstance().get_reviews(params);
        ctx.status = 200; // Set status code
        ctx.body = reviewsResponse; // Set response body
    } catch (error) {
        // Handle errors from get_reviews
        ctx.throw(500, `Error fetching reviews: ${error.message}`);
    }
};
