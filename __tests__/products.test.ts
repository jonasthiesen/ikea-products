import {describe, it, expect} from "@jest/globals"
import {createMocks} from "node-mocks-http"
import productHandler from "../pages/api/products/index"
import productItemHandler from "../pages/api/products/[productId]"
import products from "../data/products.json"

describe("/api/products", () => {
  it("no search query returns all results", async () => {
    const {req, res} = createMocks({
      method: "GET",
    })

    await productHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({
      data: products,
    })
  })

  it("searching for 'backack' returns backpack result", async () => {
    const {req, res} = createMocks({
      method: "GET",
      query: {
        search: "backpack",
      },
    })

    await productHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({
      data: [
        {
          id: 1,
          title: "Foldsack Backpack",
          price: 109.95,
          description:
            "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
          category: "men's clothing",
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          rating: {
            rate: 3.9,
            count: 120,
          },
        },
      ],
    })
  })
})

describe("/api/products/[productId]", () => {
  it("returns the record for the given ID", async () => {
    const {req, res} = createMocks({
      method: "GET",
      query: {
        productId: "1",
      },
    })

    await productItemHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({
      data: {
        id: 1,
        title: "Foldsack Backpack",
        price: 109.95,
        description:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: {
          rate: 3.9,
          count: 120,
        },
      },
    })
  })

  it("returns 404 if record does not exist", async () => {
    const {req, res} = createMocks({
      method: "GET",
      query: {
        productId: "9999",
      },
    })

    await productItemHandler(req, res)

    expect(res._getStatusCode()).toBe(404)
  })

  it("returns 400 if the ID is not a number", async () => {
    const {req, res} = createMocks({
      method: "GET",
      query: {
        productId: "hello",
      },
    })

    await productItemHandler(req, res)

    expect(res._getStatusCode()).toBe(400)
  })
})
