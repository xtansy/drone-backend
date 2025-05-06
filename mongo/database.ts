import mongoose, { Model } from "mongoose";

import {
  Point,
  Polygon,
  OrganizationPoint,
  MeasurementPoint,
  MeasurementDevice,
  type PointModelDocument,
  type PolygonModelDocument,
  type OrganizationPointModelDocument,
  type MeasurementPointModelDocument,
  type MeasurementDevicetModelDocument,
} from "../models";

mongoose.Promise = global.Promise;

interface Database {
  mongoose: any;
  point: Model<PointModelDocument>;
  polygon: Model<PolygonModelDocument>;
  organizationPoint: Model<OrganizationPointModelDocument>;
  measurementPoint: Model<MeasurementPointModelDocument>;
  measurementDevice: Model<MeasurementDevicetModelDocument>;
}

export const db: Database = {
  mongoose,
  point: Point,
  polygon: Polygon,
  organizationPoint: OrganizationPoint,
  measurementPoint: MeasurementPoint,
  measurementDevice: MeasurementDevice,
};
