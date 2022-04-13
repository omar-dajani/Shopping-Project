import { gql } from "@apollo/client";

export const GET_STORE_QUERY = gql`
    query items {
        items {
            id
            title
            description
            stock
        }
    }
`

export const BUY_ITEM = gql`
mutation updateStock($id: Int!, $payload: Int!) {
    updateStock(id: $id, payload: $payload) {
      id
      title
      description
      stock
    }
  }
`