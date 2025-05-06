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
      .populate("organizationPoint")
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

export const getPointById = async (req: Request, res: Response) => {
  try {
    const { pointId } = req.params;

    const point = await Point.findById(pointId)
      .populate({
        path: "measurements",
        populate: {
          path: "measurementDevice",
        },
      })
      .populate("organizationPoint")
      .exec();

    if (!point) {
      return res.status(404).json({
        message: "Точка с указанным ID не найдена",
      });
    }

    res.json({
      message: "Точка успешно получена",
      data: point,
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: "Ошибка при получении точки",
      error: error instanceof Error ? error.message : "Неизвестная ошибка",
    });
  }
};
