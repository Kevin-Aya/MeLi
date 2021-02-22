const { createMocks } = require("node-mocks-http");
import getItemById from "./[id]";
import getItems from "./index";

describe("API items", () => {
  it("/items/search=:search", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        search: "muñeco",
      },
    });
    await getItems(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toStrictEqual(
      expect.objectContaining({
        author: expect.objectContaining({
          name: expect.any(String),
          lastname: expect.any(String),
        }),
        items: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            price: {
              currency: expect.any(String),
              amount: expect.any(String),
              decimals: expect.any(String),
            },
            picture: expect.any(String),
            condition: expect.any(String),
            free_shipping: expect.any(Boolean),
            state_name: expect.any(String),
          }),
        ]),
      }),
    );
  });

  it("/items/:id", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        id: "MLA849382617",
      },
    });
    await getItemById(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toStrictEqual(
      expect.objectContaining({
        author: expect.objectContaining({
          name: expect.any(String),
          lastname: expect.any(String),
        }),
        item: expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          price: {
            currency: expect.any(String),
            amount: expect.any(String),
            decimals: expect.any(String),
          },
          picture: expect.any(String),
          condition: expect.any(String),
          free_shipping: expect.any(Boolean),
          sold_quantity: expect.any(Number),
          description: expect.any(String),
          categories: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              name: expect.any(String),
            }),
          ]),
        }),
      }),
    );
  });
  it("/items/:id 404 Not Found", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        id: "MLA84938261",
      },
    });
    await getItemById(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(JSON.parse(res._getData())).toStrictEqual(
      expect.objectContaining({
        error: expect.objectContaining({
          message: expect.any(String),
          error: expect.any(String),
          status: expect.any(Number),
          cause: expect.arrayContaining([]),
        }),
        message: expect.any(String),
        status: expect.any(Number),
      }),
    );
  });
});
