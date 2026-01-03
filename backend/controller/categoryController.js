const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        const { name, budget, spent, icon } = req.body;
        const newCategory = new Category({ 
            name, 
            budget, 
            spent: Number(spent) || 0
            ,icon, 
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

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, budget, spent, icon } = req.body;
        const updatedCategory = await Category.findOneAndUpdate(
            { _id: id, user: req.user._id },
            { name, budget, spent, icon },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la categoría", error });
    }
};