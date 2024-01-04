import Image from "next/image"
import {
  ValidatorTable,
  BlocksTable,
  NodeOperatorsTable,
} from "@/components/tables"
import { getValidators, getBlocks, getNodeOperators } from "@/utils/apiCalls"
import { startValidatorUpdateInterval, validatorUpdate } from "@/utils/database"
import { useEffect, useState } from "react"

export default async function Home() {
  const validatorResult = await getValidators()
  await startValidatorUpdateInterval()
  // const blocksResult = await getBlocks()
  // const nodeResult = await getNodeOperators()
  // const updateResult = await validatorUpdate()
  // console.log(" validatorResult", validatorResult)
  // console.log("  blocksResult", blocksResult)
  // console.log(" nodeResult", nodeResult)

  return (
    <>
      {validatorResult ? (
        <>
          <ValidatorTable list={validatorResult.data} />
        </>
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
