const express = require('express');
const router = express.Router();
const User = require('../models/user');

// INDEX Route 
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)
    res.render('foods/index.ejs', { pantry: user.pantry })
  } catch (err) {
    res.redirect('/')
  }
});

// NEW Route 
router.get('/new', (req, res) => {
  res.render('foods/new.ejs')
});

// CREATE Route 
router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)
    user.pantry.push(req.body)
    await user.save()
    res.redirect(`/users/${req.session.user._id}/foods`)
  } catch (err) {
    res.redirect('/')
  }
});

// DELETE Route 
router.delete('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)
    user.pantry.pull({ _id: req.params.itemId })
    await user.save()
    res.redirect(`/users/${req.session.user._id}/foods`)
  } catch (err) {

    console.error(err)
    res.redirect('/')
  }
});

module.exports = router;



// EDIT Route 
router.get('/:itemId/edit', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)
    const food = user.pantry.id(req.params.itemId)
    res.render('foods/edit.ejs', { food })
  } catch (err) {
    res.redirect('/')
  }
});

// UPDATE Route
router.put('/:itemId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id)
    const food = user.pantry.id(req.params.itemId)
    food.set(req.body)
    await user.save()
    res.redirect(`/users/${req.session.user._id}/foods`)
  } catch (err) {
    res.redirect('/')
  }
});

module.exports = router;
