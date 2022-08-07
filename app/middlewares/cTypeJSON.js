'use strict';

module.exports = async function (ctx, next){
    if(['GET', 'HEAD'].indexOf(ctx.method.toUpperCase()) === -1){
        if(typeof ctx.get('Content-Type') === 'undefined' || ctx.get('Content-Type').indexOf('json') === -1){
            error('InvalidContentTypeError', 'The content type sent is invalid. Please change it to application/json');
        }
    }

    await next();
};
