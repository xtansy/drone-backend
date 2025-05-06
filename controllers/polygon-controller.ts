import { Request, Response } from "express";
import mongoose from "mongoose";

import {
  Polygon,
  Point,
  OrganizationPoint,
  MeasurementPoint,
  MeasurementDevice,
} from "../models";

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

export const deletePolygonById = async (req: Request, res: Response) => {
  const { polygonId } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const polygon = await Polygon.findById(polygonId).session(session);
    if (!polygon) {
      return res.status(404).json({ errorMessage: "Полигон не найден" });
    }

    const pointIds = polygon.points.map((p) => p.toString());
    const points = await Point.find({ _id: { $in: pointIds } }).session(
      session
    );

    const measurementIds = points.flatMap((point) =>
      point.measurements.map((m) => m.toString())
    );

    const measurements = await MeasurementPoint.find({
      _id: { $in: measurementIds },
    }).session(session);

    const deviceIds = measurements.map((m) => m.measurementDevice.toString());

    await Promise.all([
      MeasurementDevice.deleteMany({ _id: { $in: deviceIds } }).session(
        session
      ),
      MeasurementPoint.deleteMany({ _id: { $in: measurementIds } }).session(
        session
      ),
      Point.deleteMany({ _id: { $in: pointIds } }).session(session),
      OrganizationPoint.deleteOne({ _id: polygon.organizationPoint }).session(
        session
      ),
      Polygon.deleteOne({ _id: polygonId }).session(session),
    ]);

    await session.commitTransaction();
    res.json({ message: "Полигон и связанные данные удалены" });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      errorMessage: "Ошибка при удалении полигона",
      error: error instanceof Error ? error.message : "Неизвестная ошибка",
    });
  } finally {
    session.endSession();
  }
};
