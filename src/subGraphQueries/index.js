import { useApollo } from "@/utils/apollo"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client"

const GET_ALL_DATA = gql`
  {
    validators {
      id
      clusterId
      rollup
      status
    }
    nodeOperators {
      id
      ip
      name
      pubkey
    }
    clusters {
      id
      operatorIds
      ssvFeePaid
    }
    rollups {
      bridgeContract
      executionRewards
      id
      name
      nexusFeePercentage
      slashing
      stakingLimit
      validatorCount
      clusterId
    }
  }
`

const GET_ALL_ROLLUP = gql`
  {
    rollups {
      bridgeContract
      clusterId
      executionRewards
      id
      name
      nexusFeePercentage
      slashing
      stakingLimit
      validatorCount
    }
  }
`

const query = gql`
  query Now {
    rollups {
      bridgeContract
      clusterId
      executionRewards
      id
      name
      nexusFeePercentage
      slashing
      stakingLimit
      validatorCount
    }
  }
`
// const { data } = await getClient().query({ query })
export { GET_ALL_DATA, GET_ALL_ROLLUP }
