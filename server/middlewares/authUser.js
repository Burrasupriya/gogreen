import jwt from 'jsonwebtoken';

const authUser = async(req, res, next)=>{
    const {token} =req.cookies;

    if(!token){
        return res.json({success: false, message: 'Not Autorized'});
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if(tokenDecode.id){
            //req.body.userId = tokenDecode.id;
            req.userId = tokenDecode.id;
            // next(); here it is not there
            next();
        }
        else{
            return res.json({success: false, message: 'Not Autorized'});
        }
      //next()

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export default authUser;