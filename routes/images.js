/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Image retrieval & captions
 */

/**
 * @swagger
 * /api/images:
 *   get:
 *     summary: Get all images
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: List of images
 */

/**
 * @swagger
 * /api/images/{id}:
 *   get:
 *     summary: Get a single image (with captions)
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Image data
 *       404:
 *         description: Image not found
 */

/**
 * @swagger
 * /api/images/{id}/captions:
 *   post:
 *     summary: Add a caption to an image (requires login)
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Caption added
 *       401:
 *         description: Unauthorized
 */

const express = require('express');
const cacheMiddleware = require('../middleware/cache');
const router = express.Router();
const { Image, Caption } = require('../models');

const requireLogin = require('../middleware/authMiddleware');


// 1. GET all images
router.get('/', cacheMiddleware, async (req, res) => {
  try {
    const images = await Image.findAll();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET one image by id (with captions)
router.get('/:id', cacheMiddleware, async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id, {
      include: [{ model: Caption }]
    });

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. POST add caption to an image
router.post('/:id/captions', requireLogin, async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    const caption = await Caption.create({
      text: req.body.text,
      ImageId: image.id,
      UserId: req.session.userId  
    });

    res.json(caption);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});



module.exports = router;
