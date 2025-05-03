import { Request, Response } from "express";

export const get = async (req: Request, res: Response) => {
  try {
    res.json({
      message: "Успех!",
    });
  } catch (error) {
    res.status(403).json({
      errorMessage: "Ошибка",
      error,
    });
  }
};
