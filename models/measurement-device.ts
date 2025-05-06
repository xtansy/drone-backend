import { Schema, model } from "mongoose";
import { Document } from "mongoose";

export interface MeasurementDeviceModel {
  name: string;
  manufacturer: string;
  serialNumber: string;
}

export type MeasurementDevicetModelDocument = MeasurementDeviceModel & Document;

export const MeasurementDevice = model<MeasurementDevicetModelDocument>(
  "measurementDevice",
  new Schema<MeasurementDeviceModel>(
    {
      name: {
        required: true,
        type: String,
      },
      manufacturer: {
        required: true,
        type: String,
      },
      serialNumber: {
        required: true,
        type: String,
      },
    },
    {
      versionKey: false,
    }
  )
);
