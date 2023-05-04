//dependencies
import mongoose from "mongoose";

//connection function
export const conn = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose
      .connect(process.env.MONGODB_CONN_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log(`Connected to Database`));
  } catch (error) {
    if (error) {
      console.log(`Unable to Connect to Database with err: ${error}`);
    }
  }
};
