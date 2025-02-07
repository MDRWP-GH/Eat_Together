exports.create = async (req, res) => {
    try{
        // code
        res.send('Create Category');
    }catch(err){
        //err
        console.log(err);
        res.status(500).json({ message : "Server error"});
    }
};

exports.list = async (req, res) => {
    try{
        // code
        res.send('List Category');
    }catch(err){
        //err
        console.log(err);
        res.status(500).json({ message : "Server error"});
    }
};

exports.remove = async (req, res) => {
    try{
        // code
        const { id } = req.params;
        console.log(id);
        res.send('Remove Category');
    }catch(err){
        //err
        console.log(err);
        res.status(500).json({ message : "Server error"});
    }
};