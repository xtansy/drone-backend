import { Request, Response } from "express";
import mongoose from "mongoose";

import { Polygon, Point, OrganizationPoint, MeasurementPoint } from "../models";

export const getAllPolygons = async (_: Request, res: Response) => {
  try {
    const polygons = await Polygon.find()
      .populate({
        path: "points",
        populate: {
          path: "measurements",
          populate: {
            path: "measurementDevice",
          },
        },
      })
      .populate("organizationPoint")
      .exec();

    res.json({
      message: "Успех!",
      data: polygons,
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: "Ошибка при получении полигонов",
      error: error instanceof Error ? error.message : "Неизвестная ошибка",
    });
  }
};

export const deleteAllPolygons = async (_: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Promise.all([
      Polygon.deleteMany({}).session(session),
      Point.deleteMany({}).session(session),
      OrganizationPoint.deleteMany({}).session(session),
      MeasurementPoint.deleteMany({}).session(session),
    ]);

    await session.commitTransaction();
    res.json({ message: "Все данные успешно удалены" });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      errorMessage: "Ошибка при удалении",
      error: error instanceof Error ? error.message : "Неизвестная ошибка",
    });
  } finally {
    session.endSession();
  }
};
