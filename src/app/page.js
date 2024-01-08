"use client"

import Image from "next/image"
import {
  ValidatorTable,
  BlocksTable,
  NodeOperatorsTable,
} from "@/components/tables"
import { getBlocks, getNodeOperators, getValidators } from "@/utils/apiCalls"

import { useEffect, useState } from "react"

export default function Home() {
  const [validators, setValidators] = useState([])
  const [nodeOperators, setNodeOperators] = useState([])
  const [blocks, setBlocks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const validater = await getValidators()
        const node = await getNodeOperators()
        const block = await getBlocks()

        // console.log("node", node)
        // console.log("block", block)

        setValidators(validater.data)
        setNodeOperators(node.data)
        setBlocks(block.data)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchData() // Initial fetch

    // Set up interval for subsequent fetches
    const intervalId = setInterval(fetchData, 60000)

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className=" flex justify-center flex-col  items-center">
      {validators ? (
        <ValidatorTable list={validators} />
      ) : (
        <>Fetching Validators ...</>
      )}

      {blocks ? (
        <>
          <BlocksTable list={blocks} />
        </>
      ) : (
        <>Fetching BlockData ...</>
      )}

      {nodeOperators ? (
        <>
          <NodeOperatorsTable list={nodeOperators} />
        </>
      ) : (
        <>Fetching nodeOperator Data ...</>
      )}
    </div>
  )
}
