'use strict';
class Common {
    constructor(){
        this.multi = [];
    }

    async get_details(params) {

        var add_user = await db(`
            INSERT INTO feeds(
                full_name,
                email,
                message
            )
            VALUES(?,?,?)
            `,[params.full_name, params.email, params.message]);
    
        var retVal = {
            status_code: 200,
            message: "Details Saved Successfully.",
            data: {
                full_name: params.full_name,
                email: params.email,
                message: params.message
            }
        }
    
        return retVal;
    }
}

module.exports.getInstance = () => new Common();


