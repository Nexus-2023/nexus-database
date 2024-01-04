"use client"

import Image from "next/image"
import {
  ValidatorTable,
  BlocksTable,
  NodeOperatorsTable,
} from "@/components/tables"
import { getBlocks, getNodeOperators, getValidators } from "@/utils/apiCalls"
// import { startValidatorUpdateInterval, validatorUpdate } from "@/utils/database"

import { useEffect, useState } from "react"

export default function Home() {
  const [validators, setValidators] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getValidators()

        console.log("fetchedData", fetchedData)

        setValidators(fetchedData.data)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchData() // Initial fetch

    // Set up interval for subsequent fetches
    const intervalId = setInterval(fetchData, 5000)
    // console.log("data", data)
    // Cleanup function to clear the interval
    return () => clearInterval(intervalId)
  }, [])

  // const validatorResult = await getValidators()
  // await startValidatorUpdateInterval()
  // const blocksResult = await getBlocks()
  // const nodeResult = await getNodeOperators()
  // const updateResult = await validatorUpdate()
  // console.log(" validatorResult", validatorResult)
  // console.log("  blocksResult", blocksResult)
  // console.log(" nodeResult", nodeResult)

  return (
    <>
      {validators ? (
        <ValidatorTable list={validators} />
      ) : (
        <>Fetching Validators ...</>
      )}

      {/* {blocksResult ? (
        <>
          <BlocksTable list={blocksResult.data} />
        </>
      ) : (
        <>Fetching BlockData ...</>
      )}

      {nodeResult ? (
        <>
          <NodeOperatorsTable list={nodeResult.data} />
        </>
      ) : (
        <>Fetching nodeOperator Data ...</>
      )} */}
    </>
  )
}
