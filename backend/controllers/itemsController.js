// Controller for handling item-related operations
const { handleSuccess, handleBadRequest, handleNotFound, handleCreated } = require('../config/errorhandler');
const Item = require('../models/Item');

exports.addItem = async (req, res) => {
    try {
        const { itemName, quantity, price, description, category } = req.body;

        const newItem = new Item({
            itemName,
            quantity: quantity || 0,
            price,
            description,
            category: category || 'Other'
        });

        await newItem.save();

        return handleCreated(res, { success: true, message: 'Item added successfully', data: newItem });
    } catch (error) {
        console.error(error);
        return handleBadRequest(res, { success: false, message: error.message });
    }
};

exports.editItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { itemName, quantity, price, description, category } = req.body;

        const item = await Item.findById(id);

        if (!item) {
            return handleNotFound(res, { success: false, message: 'Item not found' });
        }

        item.itemName = itemName || item.itemName;
        item.quantity = quantity !== undefined ? quantity : item.quantity;
        item.price = price !== undefined ? price : item.price;
        item.description = description !== undefined ? description : item.description;
        item.category = category !== undefined ? category : item.category;

        const updatedItem = await item.save();

        return handleSuccess(res, { success: true, message: 'Item updated successfully', data: updatedItem });
    } catch (error) {
        console.error(error);
        return handleBadRequest(res, { success: false, message: error.message });
    }
};

exports.getItem = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await Item.findById(id);

        if (!item) {
            return handleNotFound(res, { success: false, message: 'Item not found' });
        }

        return handleSuccess(res, { success: true, message: 'Item retrieved successfully', data: item });
    } catch (error) {
        console.error(error);
        return handleBadRequest(res, { success: false, message: error.message });
    }
};

exports.getAllItems = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};

        const items = await Item.find(filter).sort({ createdAt: -1 });

        if (!items.length) {
            return handleSuccess(res, { 
                success: true, 
                message: 'No items found. Add items to your inventory.', 
                data: [] 
            });
        }

        return handleSuccess(res, { success: true, message: 'Items retrieved successfully', data: items });
    } catch (error) {
        console.error(error);
        return handleBadRequest(res, { success: false, message: 'Error retrieving items' });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await Item.findByIdAndDelete(id);

        if (!item) {
            return handleNotFound(res, { success: false, message: 'Item not found' });
        }

        return handleSuccess(res, { success: true, message: 'Item deleted successfully' });
    } catch (error) {
        console.error(error);
        return handleBadRequest(res, { success: false, message: error.message });
    }
};
