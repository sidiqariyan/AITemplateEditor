const express = require('express');
const Template = require('../models/Template');
const User = require('../models/User');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Get admin dashboard stats
router.get('/dashboard', auth, adminAuth, async (req, res) => {
  try {
    const [
      totalUsers,
      totalTemplates,
      publicTemplates,
      premiumTemplates,
      activeUsers,
      recentTemplates
    ] = await Promise.all([
      User.countDocuments({ isActive: true }),
      Template.countDocuments({ isActive: true }),
      Template.countDocuments({ isPublic: true, isActive: true }),
      Template.countDocuments({ isPremium: true, isActive: true }),
      User.countDocuments({ 
        isActive: true, 
        lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } 
      }),
      Template.find({ isActive: true })
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 })
        .limit(10)
        .lean()
    ]);

    const stats = {
      totalUsers,
      totalTemplates,
      publicTemplates,
      premiumTemplates,
      activeUsers,
      recentTemplates
    };

    res.json({ stats });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
});

// Get all users (admin only)
router.get('/users', auth, adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    
    const query = { isActive: true };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await User.countDocuments(query);

    res.json({
      users,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Get all templates (admin only)
router.get('/templates', auth, adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, search, category, isPublic } = req.query;
    
    const query = { isActive: true };
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (isPublic !== undefined) {
      query.isPublic = isPublic === 'true';
    }

    const templates = await Template.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Template.countDocuments(query);

    res.json({
      templates,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get admin templates error:', error);
    res.status(500).json({ message: 'Error fetching templates', error: error.message });
  }
});

// Create public template (admin only)
router.post('/templates', auth, adminAuth, async (req, res) => {
  try {
    const templateData = {
      ...req.body,
      createdBy: req.user.userId,
      isPublic: true,
      isPremium: req.body.isPremium || false
    };

    const template = new Template(templateData);
    await template.save();

    const populatedTemplate = await Template.findById(template._id)
      .populate('createdBy', 'name email');

    res.status(201).json({ 
      message: 'Public template created successfully', 
      template: populatedTemplate 
    });
  } catch (error) {
    console.error('Create admin template error:', error);
    res.status(500).json({ message: 'Error creating template', error: error.message });
  }
});

// Update template visibility/premium status (admin only)
router.put('/templates/:id', auth, adminAuth, async (req, res) => {
  try {
    const { isPublic, isPremium, category, tags } = req.body;
    
    const template = await Template.findByIdAndUpdate(
      req.params.id,
      { isPublic, isPremium, category, tags },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.json({ 
      message: 'Template updated successfully', 
      template 
    });
  } catch (error) {
    console.error('Update admin template error:', error);
    res.status(500).json({ message: 'Error updating template', error: error.message });
  }
});

// Delete template (admin only)
router.delete('/templates/:id', auth, adminAuth, async (req, res) => {
  try {
    const template = await Template.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.json({ message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Delete admin template error:', error);
    res.status(500).json({ message: 'Error deleting template', error: error.message });
  }
});

// Update user role (admin only)
router.put('/users/:id/role', auth, adminAuth, async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ 
      message: 'User role updated successfully', 
      user 
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ message: 'Error updating user role', error: error.message });
  }
});

// Deactivate user (admin only)
router.put('/users/:id/deactivate', auth, adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deactivated successfully' });
  } catch (error) {
    console.error('Deactivate user error:', error);
    res.status(500).json({ message: 'Error deactivating user', error: error.message });
  }
});

module.exports = router;