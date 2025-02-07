exports.register = async (req, res) => {
    try{
        const { email, password } = req.body;

        if(!email){
            return res.status(400).json({ message : "Please fill Email in fields"});
        }
        
        if(!password){
            return res.status(400).json({ message : "Please fill Password in fields"});
        }

        console.log(email, password);
        res.send('Register');
    }catch(err){
        //err
        console.log(err);
        res.status(500).json({ message : "Server error"});
    }
};

exports.login = async (req, res) => {
    try{
        res.send('Login');
    }catch(err){
        //err
        console.log(err);
        res.status(500).json({ message : "Server error"});
    }
}

exports.currentUser = async (req, res) => {
    try{
        res.send('Current User');
    }catch(err){
        //err
        console.log(err);
        res.status(500).json({ message : "Server error"});
    }
};

