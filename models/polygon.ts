import { Schema, model } from "mongoose";
import { Document } from "mongoose";

import { type PointModel } from "./point";
import { type OrganizationPointModel } from "./organization-point";

export interface PolygonModel {
  coordinates: number[][];
  points: PointModel[];
  organizationPoint: OrganizationPointModel;
}

export type PolygonModelDocument = PolygonModel & Document;

export const Polygon = model<PolygonModelDocument>(
  "Polygon",
  new Schema<PolygonModel>(
    {
      coordinates: {
        required: true,
        type: [[Number]],
      },
      points: [
        {
          required: true,
          type: Schema.Types.ObjectId,
          ref: "Point",
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
