## Overiew

Front end next.js version 13 reposiotory for monitoring Database


## Getting Started

- create a env.local file in the root of the cloned project 
- fill in the variables with postgres sql database schema of nexusDatabase
- enter the following commands
 
```bash
npm install # to install packages

npm run dev  # to start the application

```

## Database Schema 

![image](https://github.com/Nexus-2023/nexus-database/assets/42178214/b4263b08-ed27-4e19-a4d2-091f8cf230ac)


# Documentation


## Project Structure


- **src/**
  - **app/**
  - **components/**
  - **lib/**
  - **subgraphQueries/**
  - **utils/**


## Utils Folder

The `utils` folder contains several utility functions and constants.

### `index.js`

This file exports the following functions and constants:

- `calculateScore(balance, slashed)`: Calculates a score based on the provided balance and slashed status.
- `arraysEqual(array1, array2)`: Compares two arrays for equality.
- `getLatestValidatorSubgraphResult()`: Fetches the latest validator subgraph result using Apollo Client.

### `appolo.js`

This file contains functions for creating and using the Apollo Client.

- `createApolloClient()`: Creates an instance of Apollo Client.
- `useApollo()`: Custom hook for using the Apollo Client in React components.

### `apiCalls.js`

This file defines various asynchronous functions for making API calls to different endpoints:

- `getValidators()`, `postValidator()`, `updateValidator()`: CRUD operations for validators Table.
- `getNodeOperators()`: Fetches data from the NodeOperator Table.
- `getBlocks()`, `postBlocks()`, `updateBlock()`: CRUD operations for blocks Table.

### `database.js`

This file manages interactions with the database, including functions for inserting and updating validators and blocks.

- `validatorInsert({ subgraphResult })`: Inserts new validators into the database based on the subgraph result.
- `validatorUpdate()`: Updates existing validators in the database.
- `BlockInsert()`: Inserts new blocks into the database.
- `BlockUpdate({ block })`: Updates existing blocks in the database.
- `startValidatorUpdateInterval()`: Sets up an interval to periodically update validators.
- `checkForValidatorSubgraphUpdates()`: Monitors the subgraph for updates and triggers the validator insert function.


## SubGraphQueries Folder

The `subGraphQueries` folder contains GraphQL queries used to fetch data from your Apollo Client.

### `index.js`

This file exports several GraphQL queries using the `gql` function from `@apollo/client`. Here are the queries:

- **`GET_ALL_DATA`**
  - Fetches data about validators, node operators, clusters, and rollups.

- **`GET_ALL_VALIDATORS`**
  - Fetches data about validators.

- **`GET_ALL_NODE_OPERATORS`**
  - Fetches data about node operators.

- **`GET_ALL_CLUSTERS`**
  - Fetches data about clusters.

- **`GET_ALL_ROLLUPS`**
  - Fetches data about rollups.


## Lib Folder

The `lib` folder contains a file named `client.js`.

### `client.js`

This file exports a function to create an Apollo Client instance using the `NextSSRApolloClient` and `NextSSRInMemoryCache` from `@apollo/experimental-nextjs-app-support`. The client is configured with a `HttpLink` pointing to your GraphQL API.

Usage:

```
import { getClient } from "@/lib/client"

import { GET_ALL_ROLLUPS } from "@/subGraphQueries"

export default async function Home() {
  const { data } = await getClient().query({ query: GET_ALL_ROLLUPS })

  return (
    <>
      {data && (
        <pre className=" w-[100vw] p-16">{JSON.stringify(data, null, 2)}</pre>
      )}
    </>
  )
}


```

## Compoenents Folder

The `components` folder contains React components that can be reused across your Next.js app.

### Table.jsx


The `ValidatorTable` component renders a table to display information about validators. It takes a prop `list` containing an array of validator objects and renders the following information:

- `public_key`
- `validator_index`
- `cluster_id`
- `balance (ETH)`
- `status`
- `last_update_time`
- `score %`
- `rollupname`


The `BlocksTable` component renders a table to display information about blocks. It takes a prop list containing an array of block objects and renders the following information:

- `block_number`
- `block_proposer`
- `slot`
- `root`
- `parent_root`
- `validator_exit`
- `withdrawals`
- `proposer_slashing`
- `finalized`
- `last_update_time`

The `NodeOperatorsTable` component renders a table to display information about node operators. It takes a prop list containing an array of node operator objects and renders the following information:

- `name`
- `public_key`
- `validator_count`
- `score %`
- `last_update_time`
- `node_operator_id`
- `cluster_id`


## App Folder (starting folder)

The `App` folder contains routing for the pages and layout of the application. It displays 

Structure
- `layout.js`: Defines the root layout for the application, including global styles and metadata.
- `page.js`: The main page component, responsible for fetching and displaying data in tables.
- `global.css`: Contains global CSS styles for the application.

 /Api:

- `Blocks`: Routes for interacting with block data (e.g., fetching, updating).
- `Node`: Routes for interacting with node operator data.
- `Validators`: Routes for interacting with validator data (e.g., fetching, updating).

 /graphql:

- `page.js`: A GraphQL page that fetches and displays rollup data.


## App/API

contains the api endpoint to call fron the client . using { pg } npm package to interact with the postgres database

### Validator 

- `route.js` : This file defines two API routes to manage validator data:
   - `GET` /api/validator: Retrieves all validator data from the postgres database.
   - `POST` /api/validator: Inserts a new validator record in the postgres database.

 - `update\route.js` 
   - `POST` /api/validator: Update existing validators in the postgres database.


### Blocks

- `route.js` : This file defines two API routes to manage Blocks data:
   - `GET` /api/Blocks: Retrieves all Blocks data from the postgres database.
   - `POST` /api/Blocks: Inserts a new Block record in the postgres database.

 - `update\route.js` 
   - `POST` /api/Blocks: Update two columns of existing Block data (root , finality) in the postgres database.
  

 
### Node 

- `route.js` : This file defines two API routes to manage Node operator data:
   - `GET` /api/Node: Retrieves all NodeOperator data from the postgres database.
 

 
  
     
     


