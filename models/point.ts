import { Schema, model } from "mongoose";
import { Document } from "mongoose";

import { type MeasurementPointModel } from "./measurement-point";
import { type OrganizationPointModel } from "./organization-point";

export interface PointModel {
  latitude: number;
  longitude: number;
  measurements: MeasurementPointModel[];
  organizationPoint: OrganizationPointModel;
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
      organizationPoint: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "organizationPoint",
      },
    },
    {
      versionKey: false,
    }
  )
);
