import { Request, Response } from "express";
import {
  MeasurementDevice,
  MeasurementPoint,
  OrganizationPoint,
  Point,
  Polygon,
} from "../models";

export const upload = async (req: Request, res: Response) => {
  try {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ errorMessage: "Файлы не загружены" });
    }

    const files = req.files as Express.Multer.File[];

    for (const file of files) {
      try {
        const content = file.buffer.toString("utf-8");

        let data;
        try {
          data = JSON.parse(content);
        } catch {
          throw new Error("Файл не является валидным JSON");
        }

        if (!Array.isArray(data.polygons)) {
          throw new Error(
            "Формат данных некорректен: отсутствует массив 'polygons'"
          );
        }

        for (const polygonData of data.polygons) {
          const orgPoint = await OrganizationPoint.create(
            polygonData.organizationPoint
          );

          const pointIds = [];
          for (const pointData of polygonData.points) {
            const measurementIds = [];

            for (const m of pointData.measurements) {
              const deviceData = m.measurementDevice;
              const device = await MeasurementDevice.create(deviceData);

              const measurement = await MeasurementPoint.create({
                temperature: m.temperature,
                co2_level: m.co2_level,
                humidity: m.humidity,
                pressure: m.pressure,
                createdAt: m.createdAt,
                measurementDevice: device._id,
              });

              measurementIds.push(measurement._id);
            }

            const point = await Point.create({
              latitude: pointData.latitude,
              longitude: pointData.longitude,
              measurements: measurementIds,
              organizationPoint: orgPoint._id,
            });

            pointIds.push(point._id);
          }

          await Polygon.create({
            coordinates: polygonData.coordinates,
            points: pointIds,
            organizationPoint: orgPoint._id,
          });
        }
      } catch (err: any) {
        console.error("Ошибка обработки файла:", file.originalname, err);
        return res.status(400).json({
          errorMessage: `Ошибка в файле "${file.originalname}": ${err.message}`,
        });
      }
    }

    return res.json({ message: "Файлы успешно загружены и обработаны" });
  } catch (err) {
    console.error("Общая ошибка:", err);
    return res.status(500).json({ errorMessage: "Ошибка сервера" });
  }
};
