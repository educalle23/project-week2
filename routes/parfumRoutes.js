const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  getAllParfums,
  getParfumById,
  createParfum,
  updateParfum,
  deleteParfum,
} = require("../controllers/parfumController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Parfum:
 *       type: object
 *       required:
 *         - name
 *         - brand
 *         - fraganceFamily
 *         - size
 *         - price
 *         - stock
 *         - gender
 *       properties:
 *         name:
 *           type: string
 *           description: Perfume name
 *         brand:
 *           type: string
 *           description: Brand name
 *         fraganceFamily:
 *           type: string
 *           enum: [Floral, Oriental, Woody, Fresh, Citrus, Fruity, Aromatic]
 *         size:
 *           type: number
 *           description: Size in ml
 *         price:
 *           type: number
 *           description: Price in USD
 *         stock:
 *           type: number
 *           description: Available quantity
 *         gender:
 *           type: string
 *           enum: [Men, Women, Unisex]
 *         description:
 *           type: string
 *         isAvailable:
 *           type: boolean
 */

/**
 * @swagger
 * /parfums:
 *   get:
 *     summary: Get all perfumes
 *     tags: [Parfums]
 *     responses:
 *       200:
 *         description: List of all perfumes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Parfum'
 */
router.get("/", getAllParfums);

/**
 * @swagger
 * /parfums/{id}:
 *   get:
 *     summary: Get perfume by ID
 *     tags: [Parfums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Perfume ID
 *     responses:
 *       200:
 *         description: Perfume details
 *       404:
 *         description: Perfume not found
 */
router.get("/:id", getParfumById);

/**
 * @swagger
 * /parfums:
 *   post:
 *     summary: Create new perfume
 *     tags: [Parfums]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Parfum'
 *     responses:
 *       201:
 *         description: Perfume created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", isAuthenticated, createParfum);

/**
 * @swagger
 * /parfums/{id}:
 *   put:
 *     summary: Update perfume
 *     tags: [Parfums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Parfum'
 *     responses:
 *       200:
 *         description: Perfume updated successfully
 *       404:
 *         description: Perfume not found
 */
router.put("/:id", isAuthenticated, updateParfum);

/**
 * @swagger
 * /parfums/{id}:
 *   delete:
 *     summary: Delete perfume
 *     tags: [Parfums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Perfume deleted successfully
 *       404:
 *         description: Perfume not found
 */
router.delete("/:id", isAuthenticated, deleteParfum);

module.exports = router;
