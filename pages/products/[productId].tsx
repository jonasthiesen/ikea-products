import * as React from "react"
import type {NextPage} from "next"
import {useRouter} from "next/router"
import {useQuery} from "react-query"
import {ProductResponse} from "@/pages/api/products/[productId]"
import {api} from "@/services/api"
import Image from "next/image"

const Index: NextPage = () => {
  const router = useRouter()
  // not perfect, but the type string[] should not happen in this case
  const productId = (router.query.productId as string) ?? ""

  const product = useQuery(["products", "item", productId], async () => {
    const {data} = await api
      .get<ProductResponse>("/products/" + productId)
      .then((res) => res.data)

    return data
  })

  return (
    <div>
      <React.Suspense fallback={<p>Loading...</p>}>
        <Image
          src={product.data?.image ?? ""}
          alt=""
          width="300"
          height="100%"
          layout="responsive"
          objectFit="contain"
        />
        <h2>{product.data?.title}</h2>
        <p>{product.data?.category}</p>
        <p>{product.data?.description}</p>
        <p>${product.data?.price}</p>
        <p>
          {product.data?.rating.rate}/5 ({product.data?.rating.count})
        </p>
      </React.Suspense>
    </div>
  )
}

export default Index
