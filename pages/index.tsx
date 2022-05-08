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
import {Stack} from "@/components/stack"
import {Card} from "@/components/card"

const ProductsGrid = styled("div", {
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
  const search = (router.query.search as string | undefined) ?? ""
  const [searchTerm, setSearchTerm] = React.useState<string | undefined>()

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

  // Since useState runs on the server as well, that means `search` won't
  // be available server side and we need to set it on the client once the
  // router has re-hydrated.
  React.useEffect(() => {
    if (router.isReady) {
      setSearchTerm(search)
    }
  }, [router.isReady, search])

  useDebounce(
    () => {
      // To preserve scroll restoration. When going back, searchTerm will
      // technically update so we need to make sure there was an actual change
      // before updating the URL, because it acts as our state and will
      // cause a re-render when changing (loosing the scroll restoration).
      if (search !== searchTerm && searchTerm !== undefined) {
        const url = new URL(window.location.href)
        if (searchTerm !== "") {
          url.searchParams.set("search", searchTerm)
        } else {
          url.searchParams.delete("search")
        }
        router.push(url.toString())
      }
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
          value={searchTerm ?? ""}
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
        <ProductsGrid>
          {products?.data?.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card
                as="article"
                css={{
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
                <Stack direction="row" spacing="1">
                  <Text>${product.price}</Text>
                  <Text>·</Text>
                  <Text>
                    {product.rating.rate}/5 ({product.rating.count})
                  </Text>
                </Stack>
              </Card>
            </Link>
          ))}
        </ProductsGrid>
      </Box>
    </div>
  )
}

export default Index
