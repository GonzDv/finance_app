const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        const { name, budget, spent, icon } = req.body;
        const newCategory = new Category({ 
            name, 
            budget, 
            spent, icon, 
            user: req.user._id });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la categoría', error });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user._id }); 
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las categorías', error });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await Category.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        res.json({ message: "Categoría eliminada" });
    } catch (error) {
        res.status(500).json({ message: "Error al borrar" });
    }
};