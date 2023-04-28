const db = require("../databases/mysql.init");

class GoogleService {
    async googleLogin(payload,action){
        try {
            const queryString = `select * from User where email = ?;`
            db.query(
                queryString,[payload.email],(err,result)=>{
                    if(err) action( {
                        code: 1,
                        data:err.message
                    }); else {
                        action({
                            code: 0,
                            data:{
                                displayName: payload.displayName,
                                email: payload.emails[0].value
                            }
                        })
                    }
                }
            )
        } catch (error) {
            return error.message;
        }
    }
}

module.exports = new GoogleService()