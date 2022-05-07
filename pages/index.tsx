import * as React from "react"
import type {NextPage} from "next"
import Head from "next/head"
import Image from "next/image"
import {useQuery} from "react-query"
import {ProductsResponse} from "@/pages/api/products"
import {useRouter} from "next/router"
import Link from "next/link"
import {api} from "@/services/api"
import {Box} from "@/components/box"
import {Heading} from "@/components/heading"
import {styled} from "@/stitches.config"
import {Input} from "@/components/input"
import {Text} from "@/components/text"
import {useDebounce} from "react-use"

const ProductGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(1, 1fr)",
  gap: "$2",
  "@bp1": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "@bp2": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  "@bp3": {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
})

const Index: NextPage = () => {
  const router = useRouter()
  // not perfect, but the type string[] should not happen in this case
  const search = (router.query.search as string) ?? ""
  const [searchTerm, setSearchTerm] = React.useState<string>(search)

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

  useDebounce(
    () => {
      const url = new URL(window.location.href)

      if (searchTerm !== "") {
        url.searchParams.set("search", searchTerm)
      } else {
        url.searchParams.delete("search")
      }

      router.push(url.toString())
    },
    300,
    [searchTerm]
  )

  function handleSearch(event: React.FormEvent<HTMLInputElement>) {
    setSearchTerm(event.currentTarget.value)
  }

  return (
    <div>
      <Head>
        <title>Products</title>
        <meta name="description" content="Product listings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        css={{
          zIndex: "$1",
          top: 0,
          backgroundColor: "$loContrast",
          opacity: 0.98,
          position: "sticky",
          height: "fit-content",
          display: "flex",
          flexDirection: "column",
          padding: "$2",
          boxShadow: "$2",
        }}
      >
        <Input
          css={{
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
          }}
          placeholder="Try 'backpack'"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>

      <Box
        as="main"
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "$2",
          my: "$2",
          mx: "$2",
          "@bp3": {
            width: 1200,
            mx: "auto",
          },
        }}
      >
        <React.Suspense fallback={<p>Loading...</p>}>
          <ProductGrid>
            {products?.data?.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Box
                  css={{
                    backgroundColor: "$loContrast",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "$gray4",
                    borderRadius: "$2",
                    padding: "$2",
                    transition: "box-shadow 150ms ease",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: "$3",
                    },
                  }}
                >
                  <Image
                    src={product.image}
                    alt=""
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                  />
                  <Heading size="4">{product.title}</Heading>
                  <Text>{product.category}</Text>
                  <Text>${product.price}</Text>
                  <Text>
                    {product.rating.rate}/5 ({product.rating.count})
                  </Text>
                </Box>
              </Link>
            ))}
          </ProductGrid>
        </React.Suspense>
      </Box>
    </div>
  )
}

export default Index
