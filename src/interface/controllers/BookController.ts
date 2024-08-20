import { Request, Response } from "express";
import { validate } from "class-validator";
import { CreateBookDto } from "../dto/CreateBookDto";
import { DIContainer } from "../../infrastructure/DIContainer";

export class BookController {
  private getAllBooks = DIContainer.getGetAllBooksUseCase();

  async create(req: Request, res: Response) {
    const dto = Object.assign(new CreateBookDto(), req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    
  }

  async getAll(req: Request, res: Response) {
    const books = await this.getAllBooks.execute();
    res.json(books);
  }
}