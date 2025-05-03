import mongoose, { Model } from "mongoose";
mongoose.Promise = global.Promise;

interface Database {
  mongoose: any;
  user: Model<UserModelDocument>;
}

export const db: Database = {
  mongoose,
  user: User,
};
