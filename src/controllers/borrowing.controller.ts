import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllBorrowingsByCustomerId = async (req: Request, res: Response) => {
    const customerId = req.body;
    const borrowings = await prisma.borrowing.findMany({
    include: {
      book: true,
      customer: true
    },
    where: {
        customerId: customerId
    }
  });
  res.json(borrowings);
};

export const createBorrowing = async (req: Request, res: Response) => {
  const { customerId, bookId } = req.body;

  try {
    const book = await prisma.book.findUnique({ where: { id: bookId } });

    if (!book || !book.available) {
      return res.status(400).json({ error: "Book not available for borrowing" });
    }

    const borrowing = await prisma.borrowing.create({
      data: {
        bookId,
        customerId
      }
    });

    // Set book as unavailable
    await prisma.book.update({
      where: { id: bookId },
      data: { available: false }
    });

    res.status(201).json(borrowing);
  } catch (error) {
    res.status(500).json({ error: "Could not create borrowing" });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  const { borrowingId } = req.params;

  try {
    const borrowing = await prisma.borrowing.findUnique({
      where: { id: Number(borrowingId) }
    });

    if (!borrowing || borrowing.returnedAt) {
      return res.status(400).json({ error: "Invalid or already returned borrowing" });
    }

    await prisma.borrowing.update({
      where: { id: Number(borrowingId) },
      data: { returnedAt: new Date() }
    });

    await prisma.book.update({
      where: { id: borrowing.bookId },
      data: { available: true }
    });

    res.json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(500).json({ error: "Could not return book" });
  }
};
