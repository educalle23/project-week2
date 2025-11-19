const express = require("express");
const router = express.Router();
const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - phone
 *         - address
 *         - city
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         firstName:
 *           type: string
 *           description: Client's first name
 *           example: Maria
 *         lastName:
 *           type: string
 *           description: Client's last name
 *           example: Garcia
 *         email:
 *           type: string
 *           format: email
 *           description: Client's email address
 *           example: maria.garcia@email.com
 *         phone:
 *           type: string
 *           pattern: '^[0-9]{10}$'
 *           description: 10-digit phone number
 *           example: "5551234567"
 *         address:
 *           type: string
 *           description: Street address
 *           example: 123 Main Street
 *         city:
 *           type: string
 *           description: City name
 *           example: Mexico City
 *         preferredFragrances:
 *           type: array
 *           items:
 *             type: string
 *             enum: [Floral, Oriental, Woody, Fresh, Citrus, Fruity, Aromatic]
 *           description: Preferred fragrance families
 *           example: ["Floral", "Fresh"]
 *         vipStatus:
 *           type: boolean
 *           description: VIP membership status
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 */

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     description: Retrieve a list of all registered clients
 *     responses:
 *       200:
 *         description: List of all clients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Client'
 *       500:
 *         description: Server error
 */
router.get("/", getAllClients);

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Get client by ID
 *     tags: [Clients]
 *     description: Retrieve a single client by their MongoDB ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client's MongoDB ObjectId
 *         example: 673b2a1c8d4e5f6a7b8c9d0e
 *     responses:
 *       200:
 *         description: Client details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found
 *       400:
 *         description: Invalid ID format
 */
router.get("/:id", getClientById);

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Create new client
 *     tags: [Clients]
 *     description: Register a new client in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *               - address
 *               - city
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Maria
 *               lastName:
 *                 type: string
 *                 example: Garcia
 *               email:
 *                 type: string
 *                 format: email
 *                 example: maria.garcia@email.com
 *               phone:
 *                 type: string
 *                 example: "5551234567"
 *               address:
 *                 type: string
 *                 example: 123 Main Street
 *               city:
 *                 type: string
 *                 example: Mexico City
 *               preferredFragrances:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Floral", "Fresh"]
 *               vipStatus:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Client created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Client'
 *       400:
 *         description: Validation error or email already exists
 */
router.post("/", createClient);

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Update client
 *     tags: [Clients]
 *     description: Update an existing client's information
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client's MongoDB ObjectId
 *         example: 673b2a1c8d4e5f6a7b8c9d0e
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Maria
 *               lastName:
 *                 type: string
 *                 example: Garcia
 *               email:
 *                 type: string
 *                 example: maria.garcia@email.com
 *               phone:
 *                 type: string
 *                 example: "5551234567"
 *               address:
 *                 type: string
 *                 example: 456 New Avenue
 *               city:
 *                 type: string
 *                 example: Monterrey
 *               preferredFragrances:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Oriental", "Woody"]
 *               vipStatus:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Client updated successfully
 *       404:
 *         description: Client not found
 *       400:
 *         description: Validation error
 */
router.put("/:id", updateClient);

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Delete client
 *     tags: [Clients]
 *     description: Remove a client from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Client's MongoDB ObjectId
 *         example: 673b2a1c8d4e5f6a7b8c9d0e
 *     responses:
 *       200:
 *         description: Client deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Client deleted successfully
 *       404:
 *         description: Client not found
 *       400:
 *         description: Invalid ID format
 */
router.delete("/:id", deleteClient);

module.exports = router;
