// Routes for item-related endpoints
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemsController');
const { validateBody } = require('../middleware/validateRequest');
const Joi = require('joi');

// Joi validation schema for items
const itemSchema = Joi.object({
    itemName: Joi.string().trim().required().min(1).max(200).pattern(/^[a-zA-Z\s]+$/, 'letters').messages({
        'string.empty': 'Item name is required',
        'string.min': 'Item name must be at least 1 character',
        'string.max': 'Item name must be less than 200 characters',
        'string.pattern.base': 'Item name must contain only letters and spaces',
        'any.required': 'Item name is required'
    }),
    quantity: Joi.number().integer().min(0).optional().messages({
        'number.base': 'Quantity must be a number',
        'number.integer': 'Quantity must be an integer',
        'number.min': 'Quantity cannot be negative'
    }),
    price: Joi.number().min(0).required().messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price cannot be negative',
        'any.required': 'Price is required'
    }),
    description: Joi.string().trim().max(1000).optional().allow('').messages({
        'string.max': 'Description must be less than 1000 characters'
    }),
    category: Joi.string().trim().required().valid('Electronics', 'Clothing', 'Furniture', 'Other').messages({
        'any.required': 'Category is required',
        'any.only': 'Category must be one of: Electronics, Clothing, Furniture, Other'
    })
});

// Routes
router.post('/items', validateBody(itemSchema), itemController.addItem);
router.get('/items', itemController.getAllItems);
router.get('/items/:id', itemController.getItem);
router.put('/items/:id', validateBody(itemSchema), itemController.editItem);
router.delete('/items/:id', itemController.deleteItem);

module.exports = router;
