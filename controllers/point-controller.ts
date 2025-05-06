import { Request, Response } from "express";
import { Point } from "../models";

export const getAllPoints = async (_: Request, res: Response) => {
  try {
    const points = await Point.find()
      .populate({
        path: "measurements",
        populate: {
          path: "measurementDevice",
        },
      })
      .exec();

    res.json({
      message: "Успех!",
      data: points,
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: "Ошибка при получении точек",
      error: error instanceof Error ? error.message : "Неизвестная ошибка",
    });
  }
};
