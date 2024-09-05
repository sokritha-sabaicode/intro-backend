// import { object, number, string } from "yup";
import { object, string, number, Schema } from "yup";
import { Request, Response, NextFunction } from "express";

export const productSchema = object({
  name: string().required("Name is Required!"),
  price: number().required("Price is required!").positive("Price must be positive"),
  category: string().required("Category is required"),
  stock: number().required("Stock is required").integer("Stock must be integer").positive("stock amount cannot negative")
})


export function checkInputValidation(Schema: Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Schema.validate(req.body, { abortEarly: false })
      next();
    } catch (error) {
      return res.status(400).json({ message: "Invalidate", error: error })
    }
  }
}


export async function checkInput(req: Request, res: Response, next: NextFunction) {
  try {
    await productSchema.validate(req.body, { abortEarly: false })
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalidate", error: error })
  }
}





