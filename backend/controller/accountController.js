const Account = require('../models/Account');

exports.createAccount = async (req, res) => {
    try {
        const {name, balance, type, color} = req.body;
        const newAccount = new Account({ 
            name, 
            balance, 
            type, color, 
            user: req.user._id });
        await newAccount.save();
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la cuenta', error });
    }
};

exports.getAccounts = async (req, res) => {
    try {
        const accounts = await Account.find( { user: req.user._id } );
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las cuentas', error });
    }
};
exports.deleteAccount = async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedAccount = await Account.findByIdAndDelete(id);
        
        if (!deletedAccount) {
            return res.status(404).json({ message: "Cuenta no encontrada" });
        }
        
        res.json({ message: "Cuenta eliminada correctamente", deletedAccount });
    } catch (error) {
        res.status(500).json({ message: "Error al borrar la cuenta", error });
    }
};