import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllBooks = async (req: Request, res: Response) => {
  const books = await prisma.book.findMany();
  res.json(books);
};

export const createBook = async (req: Request, res: Response) => {
  const { title, author } = req.body;
  const book = await prisma.book.create({
    data: { title, author }
  });
  res.status(201).json(book);
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the book" });
  }
};