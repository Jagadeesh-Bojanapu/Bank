const authService = require('../Services/authService');

exports.register = async (req, res) => {
    try {
        const { email, password, fullName, address, phone, role } = req.body;
        const result = await authService.register(email, password, fullName, address, phone, role);
        res.status(201).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.login=async(req,res)=>{
    const{email,password,role}=req.body;
    try
    {
        const token = await authService.login(email, password, role);
        req.session.authorization={
            token,
            email
        }
        res.status(201).json({message:'User Login Successfully'});
    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
     
    }

exports.logout=()=>{

}