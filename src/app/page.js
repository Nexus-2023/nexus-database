import Image from "next/image"
import {
  ValidatorTable,
  BlocksTable,
  NodeOperatorsTable,
} from "@/components/tables"
import { getValidators, getBlocks, getNodeOperators } from "@/utils/apiCalls"

export default async function Home() {
  const validatorResult = await getValidators()
  const blocksResult = await getBlocks()
  const nodeResult = await getNodeOperators()
  console.log(" validatorResult", validatorResult.data)
  console.log("  blocksResult", blocksResult)
  console.log(" nodeResult", nodeResult)

  return (
    <>
      {validatorResult ? (
        <>
          <ValidatorTable list={validatorResult.data} />
        </>
      ) : (
        <>Fetching Validators ...</>
      )}

      {blocksResult ? (
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
      )}
    </>
  )
}
