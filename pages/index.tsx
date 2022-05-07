import * as React from "react"
import type {NextPage} from "next"
import Head from "next/head"
import Image from "next/image"
import {useQuery} from "react-query"
import {ProductsResponse} from "@/pages/api/products"
import {useRouter} from "next/router"
import Link from "next/link"
import {api} from "@/services/api"

const Index: NextPage = () => {
  const router = useRouter()
  // not perfect, but the type string[] should not happen in this case
  const search = (router.query.search as string) ?? ""

  const products = useQuery(["products", "all", search], async () => {
    const {data} = await api
      .get<ProductsResponse>("/products", {
        params: {
          search,
        },
      })
      .then((res) => res.data)

    return data
  })

  function handleSearch(event: React.FormEvent<HTMLInputElement>) {
    const searchTerm = event.currentTarget.value
    const url = new URL(window.location.href)

    if (searchTerm !== "") {
      url.searchParams.set("search", searchTerm)
    } else {
      url.searchParams.delete("search")
    }

    router.push(url.toString())
  }

  return (
    <div>
      <Head>
        <title>Products</title>
        <meta name="description" content="Product listings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <input
          placeholder="Try 'backpack'"
          value={search}
          onChange={handleSearch}
        />
        <React.Suspense fallback={<p>Loading...</p>}>
          {products?.data?.map((product) => (
            <div key={product.id}>
              <Image
                src={product.image}
                alt=""
                width="300"
                height="100%"
                layout="responsive"
                objectFit="contain"
              />
              <h2>{product.title}</h2>
              <p>{product.category}</p>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <p>
                {product.rating.rate}/5 ({product.rating.count})
              </p>
              <Link href={`/products/${product.id}`}>Go to</Link>
            </div>
          ))}
        </React.Suspense>
      </main>
    </div>
  )
}

export default Index
