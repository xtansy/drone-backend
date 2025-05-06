import { Schema, model } from "mongoose";
import { Document } from "mongoose";

import { type MeasurementDeviceModel } from "./measurement-device";

export interface MeasurementPointModel {
  temperature: number;
  co2_level: number;
  humidity: number; // влажность
  pressure: number; // давление
  createdAt: string;
  measurementDevice: MeasurementDeviceModel;
}

export type MeasurementPointModelDocument = MeasurementPointModel & Document;

export const MeasurementPoint = model<MeasurementPointModelDocument>(
  "measurementPoint",
  new Schema<MeasurementPointModel>(
    {
      temperature: {
        required: true,
        type: Number,
      },
      co2_level: {
        required: true,
        type: Number,
      },
      humidity: {
        required: true,
        type: Number,
      },
      pressure: {
        required: true,
        type: Number,
      },
      createdAt: {
        required: true,
        type: String,
      },
      measurementDevice: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "measurementDevice",
      },
    },
    {
      versionKey: false,
    }
  )
);
