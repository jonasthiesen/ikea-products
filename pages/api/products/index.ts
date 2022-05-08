import type {NextApiRequest, NextApiResponse} from "next"
import type {Product} from "@/types/product"
import products from "@/data/products.json"
import {matchSorter} from "match-sorter"

export type ProductsResponse = {
  data: Product[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductsResponse>
) {
  const search = req.query.search as string

  if (search === undefined) {
    return res.status(200).json({data: products})
  }

  res.status(200).json({
    data: matchSorter(products, search, {
      keys: [
        "title",
        // stricter matching requirement for "description"
        {threshold: matchSorter.rankings.CONTAINS, key: "description"},
      ],
    }),
  })
}
