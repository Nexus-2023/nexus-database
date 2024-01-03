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

import {
  GET_ALL_DATA,
  GET_ALL_ROLLUP,
  GET_ALL_CLUSTERS,
  GET_ALL_NODE_OPERATORS,
  GET_ALL_VALIDATORS,
} from "@/subGraphQueries"
import { getClient } from "@/lib/client"

async function postValidator({ validator }) {
  try {
    const response = await fetch("http://localhost:3000/api/Validators", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ validator }),
    })

    if (!response.ok) {
      throw new Error("Failed to create validator.")
    }

    const data = await response.json()
    console.log(data.result)

    return data
  } catch (error) {
    console.error("Error creating validator:", error)
  }
}

function calculateScore(balance, slashed) {
  const threshold = 32000000000

  if (balance > threshold) {
    return slashed ? 80 : 99
  } else {
    return 50
  }
}

export default async function Home() {
  const client = useApollo()

  // const subgraphResult = await client.query({
  //   query: GET_ALL_VALIDATORS,
  // });

  // dummy subgraph validator data
  const subgraphResult = {
    data: {
      validators: [
        {
          clusterId: "1",
          id: "0xad9a0951d00c0988d3b8e719b9e65d6bc3501c9c35392fb6f050fcbbcdd316836a887acee989730bdf093629448bb731",
          rollup: "polygonZkevm",
          status: "active_ongoing",
        },

        {
          clusterId: "2",
          id: "0xb319a5f89662c127718c0be02599dfd28f4983590bdd30a6f04ea900847d91a5dedf6ed780defa926d1fc7ed07a1c47d",
          rollup: "scroll",
          status: "active_ongoing",
        },

        {
          clusterId: "3",
          id: "0x92ec3cf2aec46c4cfed875d7390ba548ae5d7b6fda537e726033e742dfab9b70fc2a7aaf2e1ba6cc4e5a8edfd82c307a",
          rollup: "mantle",
          status: "active_ongoing",
        },
      ],
    },
  }

  // Check if there are validators in the subgraph result
  if (subgraphResult.data.validators.length > 0) {
    for (const subgraphValidator of subgraphResult.data.validators) {
      const publicKey = subgraphValidator.id
      console.log("publicKey", publicKey)

      const apiUrl = `http://47.128.81.7:3500/eth/v1/beacon/states/head/validators?id=${publicKey}`

      try {
        // Make a GET request to the external API
        const externalApiResult = await fetch(apiUrl, {
          method: "GET",
        })

        if (!externalApiResult.ok) {
          throw new Error(
            `Failed to fetch validator data. Status: ${externalApiResult.status}`
          )
        }

        const externalApiData = await externalApiResult.json()

        const externalValidators = externalApiData.data

        for (const externalValidator of externalValidators) {
          console.log("externalValidator ", externalValidator)

          // Set the validator data
          const validator = {
            public_key: externalValidator.validator.pubkey,
            validator_index: externalValidator.index,
            cluster_id: subgraphValidator.clusterId,
            balance: externalValidator.balance,
            status: subgraphValidator.status,
            score: calculateScore(
              externalValidator.balance,
              externalValidator.validator.slashed
            ),
            rollupname: subgraphValidator.rollup,
          }

          // Post the validator data to the database
          // const validatorResult = await postValidator({ validator })
          console.log(validatorResult)
        }
      } catch (error) {
        console.error("Error fetching or posting validator data:", error)
      }
    }
  } else {
    console.error("No validators found in the subgraph query result.")
  }
}
