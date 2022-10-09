'use strict';
const bcrypt = require('bcryptjs');
const Common = require('../models/Common');
const saltRounds = 10;


exports.get_details = async function(ctx){

    const schema = Joi.object({ 
      full_name: Joi.string().required(),
      email: Joi.string().email(),
      message: Joi.string()
    }); 
    const validation = schema.validate(ctx.request.body);
    
      if(validation.error){
        error('ValidationError', `There were errors in validation. ${validation.error.details[0].message.replaceAll('\"', '')}.`);
      }
  
  
    const params = {
      full_name: ctx.request.body.full_name,
      email: ctx.request.body.email,
      message: ctx.request.body.message
    }
  
    ctx.response.body = await Common.getInstance().get_details(params);
  };