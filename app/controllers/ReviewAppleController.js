'use strict';
const bcrypt = require('bcryptjs');
const ReviewApple = require('../models/ReviewApple');
const saltRounds = 10;

exports.get_reviews = async function(ctx){
  var hash = bcrypt.hashSync("reviewr", 10);

  const schema = Joi.object({ 
    url: Joi.string().required(),
    browser: Joi.string(),
    browser_unique_id: Joi.string(),
    location: Joi.string() 
  }); 
  const validation = schema.validate(ctx.request.body);
  
    if(validation.error){
      error('ValidationError', `There were errors in validation. ${validation.error.details[0].message.replaceAll('\"', '')}.`);
    }


  const params = {
        url: ctx.request.body.url,
        browser: ctx.request.body.browser || "Unknown",
        browser_unique_id: ctx.request.body.browser_unique_id || hash,
        location: ctx.request.body.location || "Unknown"
      }

  ctx.response.body = await ReviewApple.getInstance().get_reviews(params);
  };