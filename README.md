## Get started
### Hosted version
You can check out a version that's already deployed in a "production" environment here: [ikea-products.fly.dev](https://ikea-products.fly.dev)

### Clone the repo
```bash
git clone https://github.com/jonasthiesen/ikea-products
```

### Navigate to the product
```bash
cd ikea-products
```

### Install dependencies
```bash
yarn install
```

### Run the development server
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in the browser

You should now see the project running in your browser.

### List of commands you can run
```
yarn dev    # start dev server
yarn build  # build the project
yarn start  # start build in production mode
yarn lint   # run the linter
yarn test   # run the API tests
```

## Architecture
### Docker
There is a `Dockerfile`, so we can deploy this basically anywhere. This is just a copy of what the Next.js team has kindly shared here: [Next.js Dockerfile example](https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile)

### API
The API is kept within Next.js using the `/pages/api` convention. This could easily be split out to it's own service as it grows, since it's quite contained.

All responses are wrapped in `data`, because that makes it easy to add e.g. pagination and metadata in the future without a breaking change.

#### Example
```json
{
	"data": {},
	"pagination": {} <-- now it's easy to add this.
}
```

It's exposing two endpoints:

#### Get all products (and search)
```
GET /api/products
```

#### Get product
```
GET /api/products/{id}
```

### Frontend
It has a page for viewing all the products and search for them, and then it has one for viewing the individual product.

It's using `react-query` for fetching the data. The queries have been kept within the components, but as the project would grow, I find it useful to extract them to custom queries.

For styling, it's using `stiches`. A very nice variant-based CSS-in-JS library.

#### Consuming the API
The client for the API has been put in `/services/api.ts`. Then set up a BASE_URL that uses either `localhost:3000` or the production URL based on environment. Then it's easy to with `react-query` in the components/pages.

### Testing
The API has tests using `jest` and `node-mocks-http`. This allows us to run the endpoints as functions using the mocked `req` and `res` objects that we can then expect to see that the API bahaved as we expected. You can see the tests in the `__tests__` folder.

### CI/CD
Using GitHub Actions, every commit to the `main` branch will result in a new build. It will first run the tests and if they pass it will go ahead with building and deploying the site to [Fly](https://fly.io).