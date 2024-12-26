import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  try {
    const token = jwt.sign({ userId: user._id }, process.env.SCRECT_KEY, {
      expiresIn: "1d",
    });


    return res.status(200).cookie("token", token,{
        httpOnly:true,
        sameSite:"strict",
        maxAge:24*60*60*1000
    }).json({
        message,
        success:true,
        user
    })
  } catch (error) {
    console.log(error);
    
  }
};
