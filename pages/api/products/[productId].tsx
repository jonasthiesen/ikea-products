import type {NextApiRequest, NextApiResponse} from "next"
import type {Product} from "@/types/product"
import products from "@/data/products.json"

export type ProductResponse = {
  data: Product
}

type ErrorResponse = {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductResponse | ErrorResponse>
) {
  const productId = parseInt(req.query.productId as string, 10)

  if (Number.isNaN(productId)) {
    return res.status(400).json({
      error: `The product id provided is not valid, you provided: '${req.query.productId}'`,
    })
  }

  const foundProduct = products.find((product) => product.id === productId)

  if (foundProduct === undefined) {
    return res.status(404).json({
      error: `No product found with product id: '${productId}'`,
    })
  }

  res.status(200).json({data: foundProduct})
}
