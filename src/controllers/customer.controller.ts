import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching customers" });
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the customer" });
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const existing = await prisma.customer.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const customer = await prisma.customer.create({
      data: { name, email }
    });

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the customer" });
  }
};
