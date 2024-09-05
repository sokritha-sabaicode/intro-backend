import mongoose from "mongoose";


export const connection = async () => {
  try {
    await mongoose
      .connect("mongodb+srv://sokritha1:THIxq1i3y9mXyr28@bootcamp-five.cpg1j.mongodb.net/items");

    console.log('Database connection successfully...')
  } catch (error: any) {
    console.error(error.message)
  }
}



