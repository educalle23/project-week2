const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'Perfume Shop API',
    description: 'REST API for perfume shop management - Clients and Perfumes CRUD operations',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    },
    {
      url: 'https://project-week2.onrender.com',
      description: 'Production server'
    }
  ],
  tags: [
    {
      name: 'Parfums',
      description: 'Perfume management endpoints'
    },
    {
      name: 'Clients',
      description: 'Client management endpoints'
    }
  ],
  components: {
    schemas: {
      Parfum: {
        type: 'object',
        required: ['name', 'brand', 'fraganceFamily', 'size', 'price', 'stock', 'gender'],
        properties: {
          _id: {
            type: 'string',
            description: 'MongoDB ObjectId',
            example: '673b2a1c8d4e5f6a7b8c9d0e'
          },
          name: {
            type: 'string',
            description: 'Perfume name',
            example: 'Chanel No. 5'
          },
          brand: {
            type: 'string',
            description: 'Brand name',
            example: 'Chanel'
          },
          fraganceFamily: {
            type: 'string',
            enum: ['Floral', 'Oriental', 'Woody', 'Fresh', 'Citrus', 'Fruity', 'Aromatic'],
            description: 'Fragrance family category',
            example: 'Floral'
          },
          size: {
            type: 'number',
            description: 'Size in milliliters',
            example: 100
          },
          price: {
            type: 'number',
            description: 'Price in USD',
            example: 150.00
          },
          stock: {
            type: 'number',
            description: 'Available quantity',
            example: 25
          },
          gender: {
            type: 'string',
            enum: ['Men', 'Women', 'Unisex'],
            description: 'Target gender',
            example: 'Women'
          },
          description: {
            type: 'string',
            description: 'Product description',
            example: 'Iconic floral perfume with jasmine and rose notes'
          },
          isAvailable: {
            type: 'boolean',
            description: 'Availability status',
            example: true
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Creation timestamp'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last update timestamp'
          }
        }
      },
      Client: {
        type: 'object',
        required: ['firstName', 'lastName', 'email', 'phone', 'address', 'city'],
        properties: {
          _id: {
            type: 'string',
            description: 'MongoDB ObjectId',
            example: '673b2a1c8d4e5f6a7b8c9d0e'
          },
          firstName: {
            type: 'string',
            description: 'Client first name',
            example: 'Maria'
          },
          lastName: {
            type: 'string',
            description: 'Client last name',
            example: 'Garcia'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email address (unique)',
            example: 'maria.garcia@email.com'
          },
          phone: {
            type: 'string',
            pattern: '^[0-9]{10}$',
            description: '10-digit phone number',
            example: '5551234567'
          },
          address: {
            type: 'string',
            description: 'Street address',
            example: '123 Main Street'
          },
          city: {
            type: 'string',
            description: 'City name',
            example: 'Mexico City'
          },
          preferredFragrances: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['Floral', 'Oriental', 'Woody', 'Fresh', 'Citrus', 'Fruity', 'Aromatic']
            },
            description: 'Preferred fragrance families',
            example: ['Floral', 'Fresh']
          },
          vipStatus: {
            type: 'boolean',
            description: 'VIP membership status',
            example: true
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Registration timestamp'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last update timestamp'
          }
        }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);
