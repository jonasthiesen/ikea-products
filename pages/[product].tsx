import {useRouter} from "next/router"

const Post = () => {
  const router = useRouter()
  const {product} = router.query

  return <p>Post: {product}</p>
}

export default Post
