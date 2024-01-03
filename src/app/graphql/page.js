// "use client"

import Image from "next/image"

import { useApollo } from "@/utils/apollo"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client"

import { GET_ALL_DATA, GET_ALL_ROLLUP } from "@/subGraphQueries"
import { getClient } from "@/lib/client"

export default async function Home() {
  const client = useApollo()

  const result = await client.query({
    query: GET_ALL_ROLLUP,
  })

  return (
    <div className=" flex justify-center items-end w-full">
      {result.data && <pre> {JSON.stringify(result.data, null, 2)}</pre>}
    </div>
  )
}
