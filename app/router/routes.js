'use strict';
const Router        =       require('koa-router');


module.exports = function(app){
    require('./reviewTrustpilot')(app, Router);
    require('./reviewAndroid')(app, Router);
    require('./reviewApple')(app, Router);
    require('./common')(app, Router);
};
