const admin = require('firebase-admin')
module.exports.checkAuth = function checkAuth(req, res, next){
    let temp = req.headers.authorization.split(" ");
    const token = temp[1];
    if(token){
        admin.auth().verifyIdToken(token)
        .then((result) => {
            next()
        }).catch(() => {
            res.status(403).send('Unauthorized');
        });
    }else{
        res.status(403).send('Unauthorized');
    }
}

