import "../styles/globals.css"
import "../styles/reset.css"
import type {AppProps} from "next/app"
import {QueryClient, QueryClientProvider} from "react-query"
import {ReactQueryDevtools} from "react-query/devtools"
import {globalCss} from "@/stitches.config"

const globalStyles = globalCss({
  body: {
    backgroundColor: "$gray2",
  },
})

const queryClient = new QueryClient()

function MyApp({Component, pageProps}: AppProps) {
  globalStyles()

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
