import * as React from "react"
import type {NextPage} from "next"
import {useRouter} from "next/router"
import {useQuery} from "react-query"
import {ProductResponse} from "@/pages/api/products/[productId]"
import {api} from "@/services/api"
import Image from "next/image"
import {Box} from "@/components/box"
import {Stack} from "@/components/stack"
import {Heading} from "@/components/heading"
import {Text} from "@/components/text"
import {styled} from "@/stitches.config"
import {Card} from "@/components/card"
import Head from "next/head"

const ProductGrid = styled("div", {
  display: "grid",
  gridTemplateRows: "200px 1fr",
  gap: "$8",
  "@bp2": {
    gridTemplateColumns: "minmax(400px, 1fr) 3fr",
    gridTemplateRows: "none",
  },
})

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

  if (product.isLoading) {
    return <p>Loading...</p>
  } else if (product.isError) {
    return <p>Oops, looks like we had an error here. Sorry about that.</p>
  } else if (product.data == null) {
    return null
  }

  return (
    <>
      <Head>
        <title>{product.data.title}</title>
        <meta name="description" content={product.data.description} />
      </Head>
      <Stack
        css={{
          mt: "$2",
          width: "100%",
          px: "$2",
          "@bp3": {
            maxWidth: 1200,
            mx: "auto",
            px: 0,
          },
        }}
      >
        <Text
          css={{
            alignSelf: "flex-start",
            fontWeight: "bold",
            cursor: "pointer",
            "&:hover": {textDecoration: "underline"},
          }}
          onClick={router.back}
        >
          Go back
        </Text>
        <Card
          as="article"
          css={{
            padding: "$4",
          }}
        >
          <ProductGrid>
            <Box
              css={{
                position: "relative",
              }}
            >
              <Image
                priority
                src={product.data.image}
                alt=""
                layout="fill"
                objectFit="contain"
              />
            </Box>
            <Stack>
              <Heading as="h1">{product.data.title}</Heading>
              <Text size="7">${product.data.price}</Text>
              <Text>
                {product.data.rating?.rate}/5 ({product.data.rating.count})
              </Text>
              <div>
                <Heading size="4">Description</Heading>
                <Text css={{maxWidth: "60ch"}}>{product.data.description}</Text>
              </div>
            </Stack>
          </ProductGrid>
        </Card>
      </Stack>
    </>
  )
}

export default Index
