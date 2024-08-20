// import { Router } from "express";
// import { InMemoryBookRepository } from "../../infrastructure/repositories/InMemoryBookRepository";
// import { GetAllBooks } from "../../use-cases/GetAllBooks";
// import { BookController } from "../controllers/BookController";

// const router = Router();

// const bookRepository = new InMemoryBookRepository();
// const getAllBooks = new GetAllBooks(bookRepository);
// const bookController = new BookController(getAllBooks);

// router.get("/books", (req, res) => bookController.getAll(req, res));

// export { router as bookRoutes };

// import { Router } from "express";
// import { BookController } from "../controllers/BookController";
// import { authenticateToken } from "../middleware/auth";

// const router = Router();

// router.get("/books", authenticateToken, (req, res) => bookController.getAll(req, res));

// export { router as bookRoutes };


import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { InMemoryBookRepository } from '../../infrastructure/repositories/InMemoryBookRepository';
import { GetAllBooks } from '../../use-cases/GetAllBooks';
import { BookController } from '../controllers/BookController';

const router = Router();

const bookRepository = new InMemoryBookRepository();
const getAllBooks = new GetAllBooks(bookRepository);
const bookController = new BookController();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Récupère tous les livres
 *     security:
 *       - bearerAuth: ["true"]
 *     responses:
 *       200:
 *         description: Liste des livres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: L'identifiant unique du livre.
 *                   title:
 *                     type: string
 *                     description: Le titre du livre.
 *                   author:
 *                     type: string
 *                     description: L'auteur du livre.
 *       401:
 *         description: Non autorisé - Authentification requise
 */

router.get('/books', authenticateToken, (req, res) =>
  bookController.getAll(req, res)
);

export { router as bookRoutes };