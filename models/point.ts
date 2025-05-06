import { Schema, model } from "mongoose";
import { Document } from "mongoose";

import { type MeasurementPointModel } from "./measurement-point";

export interface PointModel {
  latitude: number;
  longitude: number;
  measurements: MeasurementPointModel[];
}

export type PointModelDocument = PointModel & Document;

export const Point = model<PointModelDocument>(
  "Point",
  new Schema<PointModel>(
    {
      latitude: {
        required: true,
        type: Number,
      },
      longitude: {
        required: true,
        type: Number,
      },

      measurements: [
        {
          required: true,
          type: Schema.Types.ObjectId,
          ref: "measurementPoint",
        },
      ],
    },
    {
      versionKey: false,
    }
  )
);
