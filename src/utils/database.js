import { calculateScore } from "@/utils"

import {
  getValidators,
  getBlocks,
  getNodeOperators,
  postValidator,
  updateValidator,
} from "@/utils/apiCalls"

import { GET_ALL_VALIDATORS } from "@/subGraphQueries"
import { arraysEqual } from "@/utils"

import { getLatestValidatorSubgraphResult } from "@/utils"

async function validatorInsert({ subgraphResult }) {
  // Check if there are validators in the subgraph result
  if (subgraphResult.data.validators.length > 0) {
    // Fetch existing validators from the database
    const existingValidatorsResult = await getValidators()
    const existingValidators = existingValidatorsResult.data

    for (const subgraphValidator of subgraphResult.data.validators) {
      const publicKey = subgraphValidator.id

      // Check if the public key already exists in the database
      const keyExists = existingValidators.some(
        validator => validator.public_key === publicKey
      )

      // insert only those validators that does'nt exists in the database
      if (!keyExists) {
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

          // Assuming the externalApiData structure, adjust accordingly based on the actual structure

          const externalValidators = externalApiData.data

          for (const externalValidator of externalValidators) {
            console.log(
              "validator insert externalValidator ",
              externalValidator
            )

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
            const validatorResult = await postValidator({ validator })
            console.log(validatorResult)
          }
        } catch (error) {
          console.error("Error fetching or posting validator data:", error)
        }
      } else {
        console.log(
          `Validator with public key ${publicKey} already exists. Skipping.`
        )
      }
    }
  } else {
    console.error("No validators found in the subgraph query result.")
  }
}

async function validatorUpdate() {
  // Fetch existing validators from the database
  const existingValidatorsResult = await getValidators()

  const existingValidators = existingValidatorsResult.data

  // console.log("existingValidators", existingValidators)
  for (const existingValidator of existingValidators) {
    console.log("existingValidator", existingValidator)
    const publicKey = existingValidator.public_key

    const apiUrl = `http://47.128.81.7:3500/eth/v1/beacon/states/head/validators?id=${publicKey}`

    try {
      //fetch updated data
      const externalApiResult = await fetch(apiUrl, {
        method: "GET",
      })

      if (!externalApiResult.ok) {
        throw new Error(
          `Failed to fetch validator data. Status: ${externalApiResult.status}`
        )
      }

      const externalApiData = await externalApiResult.json()

      const externalValidator = externalApiData.data

      console.log("validator update externalValidator ", externalValidator)
      // console.log(
      //   "externalValidator.validator ",
      //   externalValidator[0].validator
      // )
      // Set the validator data
      const validator = {
        public_key: externalValidator[0].validator.pubkey,
        balance: externalValidator[0].balance,
        status: externalValidator[0].status,
        score: calculateScore(
          externalValidator[0].balance,
          externalValidator[0].validator.slashed
        ),
      }

      // Post the validator data to the database
      const validatorResult = await updateValidator({ validator })
      console.log(validatorResult)
    } catch (error) {
      console.error("Error updating validator data:", error)
    }
  }
}

async function startValidatorUpdateInterval() {
  // Initial call
  await validatorUpdate()

  // Set the interval to call validatorUpdate every min
  setInterval(async () => {
    await validatorUpdate()
  }, 60000) // 1 min = 60,000 milliseconds
}

async function checkForValidatorSubgraphUpdates() {
  // const client = useApollo();

  // Initial subgraph result
  let previousSubgraphResult = await getLatestValidatorSubgraphResult()

  // Polling interval in milliseconds (e.g., every 10 seconds)
  const pollingInterval = 10000

  // Function to monitor for updates
  const monitorForUpdates = async () => {
    try {
      // Get the latest subgraph result
      const currentSubgraphResult = await getLatestValidatorSubgraphResult()

      // Compare the current result with the previous result
      if (!arraysEqual(previousSubgraphResult, currentSubgraphResult)) {
        console.log(
          "Subgraph data has been updated. Triggering validator insert function."
        )

        // Trigger the validator insert function with the latest subgraph result
        const response = await validatorInsert({
          subgraphResult: currentSubgraphResult,
        })

        // Update the previous result for the next comparison
        previousSubgraphResult = currentSubgraphResult

        console.log("Validator insert function response:", response)
      }
    } catch (error) {
      console.error("Error monitoring for updates:", error)
    }

    // Schedule the next check
    setTimeout(monitorForUpdates, pollingInterval)
  }

  // Start monitoring for updates
  monitorForUpdates()
}

export {
  validatorInsert,
  checkForValidatorSubgraphUpdates,
  startValidatorUpdateInterval,
  validatorUpdate,
}
