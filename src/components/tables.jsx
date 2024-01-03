import React from "react"

const ValidatorTable = ({ list }) => {
  return (
    <div className="p-16">
      <h1 className="flex text-2xl font-semibold justify-center items-center">
        Validators Table
      </h1>
      <table className=" text-black  mt-4   mb-7 text-left">
        <tbody>
          <tr>
            <th className="text-left text-white px-4">public_key</th>
            <th className="text-white px-4">validator_index</th>
            <th className="text-white px-4">cluster_id</th>
            <th className="text-white px-4">balance (ETH)</th>
            <th className="text-white px-4">status</th>
            <th className="text-white px-4">last_update_time</th>
            <th className="text-white px-4">score %</th>
            <th className="text-white px-4">rollupname</th>
          </tr>

          {list.map((validator, index) => (
            <tr key={index}>
              <td className="text-left  ">{validator.public_key || "Null"}</td>
              <td className="text-left ">
                {validator.validator_index || "Null"}
              </td>
              <td className="text-left ">{validator.cluster_id || "Null"}</td>

              <td className="text-left ">
                {validator.balance
                  ? (parseFloat(validator.balance) / 1e9).toFixed(9)
                  : "Null"}
              </td>
              <td className="text-left ">{validator.status || "Null"}</td>
              <td className="text-left ">
                {validator.last_update_time || "Null"}
              </td>
              <td className="text-left ">{validator.score || "Null"}</td>
              <td className="text-left ">{validator.rollupname || "Null"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const BlocksTable = ({ list }) => {
  return (
    <div className="p-16">
      <h1 className="flex text-2xl font-semibold justify-center items-center">
        Blocks Table
      </h1>
      <table className=" text-black  mt-4   mb-7 text-left">
        <tbody>
          <tr>
            <th className="text-left text-white px-4">block_number</th>
            <th className="text-white px-4">validator_exit</th>
            <th className="text-white px-4">withdrawals</th>

            <th className="text-white px-4">last_update_time</th>
          </tr>

          {list.map((validator, index) => (
            <tr key={index}>
              <td className="text-left  ">
                {validator.block_number || "Null"}
              </td>
              <td className="text-left ">
                {validator.validator_exit
                  ? validator.validator_exit.join(", ")
                  : "Null"}
              </td>
              <td className="text-left ">{validator.withdrawals || "Null"}</td>

              <td className="text-left ">
                {validator.last_update_time || "Null"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const NodeOperatorsTable = ({ list }) => {
  return (
    <div className="p-16">
      <h1 className="flex text-2xl font-semibold justify-center items-center">
        NodeOperator Table
      </h1>
      <table className=" text-black  mt-4   mb-7 text-left">
        <tbody>
          <tr>
            <th className="text-white px-4">name</th>
            <th className="text-left text-white px-4">public_key</th>
            <th className="text-white px-4">validator_count</th>
            <th className="text-white px-4">score %</th>
            <th className="text-white px-4">last_update_time</th>
            <th className="text-white px-4">node_operator_id</th>
            <th className="text-white px-4">cluster_id</th>
          </tr>

          {list.map((validator, index) => (
            <tr key={index}>
              <td className="text-left ">{validator.name || "Null"}</td>
              <td className="text-left  ">{validator.public_key || "Null"}</td>
              <td className="text-left ">
                {validator.validator_count || "Null"}
              </td>
              <td className="text-left ">{validator.score || "Null"}</td>
              <td className="text-left ">
                {validator.last_update_time || "Null"}
              </td>
              <td className="text-left ">
                {validator.node_operator_id || "Null"}
              </td>
              <td className="text-left ">{validator.cluster_id || "Null"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { ValidatorTable, BlocksTable, NodeOperatorsTable }
