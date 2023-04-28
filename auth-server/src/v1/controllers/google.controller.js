const googleService = require("../services/google.service");

class GoogleController{

    async googleLogin(req,res){
        try {
            const user = req.user;
            await googleService.googleLogin(user,(result)=>{
                res.status(200).send(result)
            })
        } catch (error) {
            res.status(500).send({
                code: 1,
                error:error.message
            })
        }
    }
}

module.exports = new GoogleController()