import { Schema, model } from "mongoose";
import { Document } from "mongoose";

export interface OrganizationPointModel {
  name: string;
  latitude: number;
  longitude: number;
}

export type OrganizationPointModelDocument = OrganizationPointModel & Document;

export const OrganizationPoint = model<OrganizationPointModelDocument>(
  "organizationPoint",
  new Schema<OrganizationPointModel>(
    {
      name: {
        required: true,
        type: String,
      },
      latitude: {
        required: true,
        type: Number,
      },
      longitude: {
        required: true,
        type: Number,
      },
    },
    {
      versionKey: false,
    }
  )
);
