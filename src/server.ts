import express, { Request, Response, NextFunction } from "express";

const app = express();
const port = 4000;
type ItemType = {
  name: string,
  id: number;
}

let Items: ItemType[] = []

// ====================
// GLOBAL MIDDLEWARE
// =====================
app.use(express.json())

app.use((_req: Request, _res: Response, _next: NextFunction) => {
  console.log(`${new Date().toLocaleString()}`)
  // next()
})

app.use((_req: Request, _res: Response, next: NextFunction) => {
  console.log('hello');
  next();
})

// =====================
// API
// =====================
app.get("/v1/products", (_req: Request, res: Response) => {
  res.json({
    message: 'success',
    data: Items
  });
})

app.post("/v1/products", (req: Request, res: Response) => {
  const id = Items.length === 0 ? 1 : Items[Items.length - 1].id + 1;
  const { name } = req.body
  const newItem = {
    id: id,
    name: name
  }
  Items.push(newItem)

  res.status(201).json({
    message: 'success',
    data: newItem
  });
})

app.get("/v1/products/:pid", (req: Request, res: Response) => {
  const itemId = parseInt(req.params.pid);

  const item = Items.find(item => item.id === itemId);

  if (!item) {
    res.status(404).json({
      message: `Item ${itemId} not found!`
    })
  }

  res.status(200).json({
    message: 'success',
    data: item
  })
})

app.put("/v1/products/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params?.id);
  const { name } = req.body;
  const findItem = Items?.findIndex(item => item?.id === id);

  if (findItem === -1) {
    res.status(404).json({
      message: `Item ${id} is not found!`
    })
  }

  Items[findItem] = {
    id: id,
    name: name
  }

  res.status(200).send(Items);
})

app.delete('/v1/products/:id', (req: Request, res: Response) => {
  Items = Items.filter((i) => i.id !== parseInt(req.params.id))
  res.status(204).send();
})


// =====================
// SERVER
// =====================
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});