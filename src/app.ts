import express, { Request, Response, NextFunction } from "express";
import itemModel from "./database/models/item.model";
import { checkInputValidation, productSchema } from "./middlewares/inputValidation";

const app = express();

// ===========================
// GLOBAL MIDDLEWARES
// ===========================
app.use(express.json())
app.use((_req: Request, _res: Response, next: NextFunction) => {
  console.log(`${new Date().toLocaleString()}`)
  next()
})


// =====================
// API
// =====================
app.get("/v1/products", async (_req: Request, res: Response) => {
  try {
    // STEP 1: Get All Item From DB
    const items = await itemModel.find();

    // STEP 2: Send Item to Client
    res.status(200).json({
      data: items
    })
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong!'
    })
  }
})

app.post("/v1/products", checkInputValidation(productSchema), async (req: Request, res: Response) => {
  try {
    // STEP 1: Get Data from Request Body
    const newItem = req.body

    // STEP 2: Create new data to DB
    const addItem = await new itemModel(newItem).save();

    // STEP 3: Send to Client
    res.status(201).json(addItem)
  } catch (error) {
    // @ts-ignore
    if (error.code === 11000) {
      res.status(400).json({
        // @ts-ignore
        message: `${error.KeyValue.name} already exist`
      })
    }
    res.status(500).json({ message: `Something went wrong` })
  }
})

app.get("/v1/products/:pid", async (req: Request, res: Response) => {
  try {
    const id = (req.params.pid);
    const item = await itemModel.findById(id);

    if (!item) {
      return res.status(404).send();
    }

    res.status(200).json(item);
  }
  catch (err) {
    res.status(500).send()
  }
})

app.put("/v1/products/:pid", async (req: Request, res: Response) => {
  try {
    const id = req.params.pid;
    const updateItem = req.body

    const update = await itemModel.findByIdAndUpdate(id, updateItem, { new: true })

    if (!update) {
      return res.status(404).json({
        message: `Item ${id} not found!`
      })
    }

    res.status(200).send(update)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.delete('/v1/products/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const del = await itemModel.findByIdAndDelete(id)

    if (!del) {
      return res.status(404).send();
    }

    res.status(204).send()
  } catch (err: any) {
    res.status(500).json({
      message: "error server"
    })
  }
})

export default app;
