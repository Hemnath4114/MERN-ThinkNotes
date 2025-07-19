import ratelimit from "../config/upstash.js";

const rateLimitter = async (req,res,next) =>{

    try {
        const {success} = await ratelimit.limit("my-limit-key");
        if (!success) {
            return res.status(429).json({message:"too many requests, plese try again later"});
        }
        next();
    } catch (error) {
        console.log("Rate limit error",error);
        next(error);
    }
};
export default rateLimitter;