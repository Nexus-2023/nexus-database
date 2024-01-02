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
            <th className="text-white px-4">balance</th>
            <th className="text-white px-4">status</th>
            <th className="text-white px-4">last_update_time</th>
            <th className="text-white px-4">score</th>
            <th className="text-white px-4">rollupname</th>
          </tr>

          {list.map((validator, index) => (
            <tr key={index}>
              <td className="text-left  ">{validator.public_key}</td>
              <td className="text-left ">{validator.validator_index}</td>
              <td className="text-left ">{validator.cluster_id}</td>
              <td className="text-left ">{validator.balance}</td>
              <td className="text-left ">{validator.status}</td>
              <td className="text-left ">{validator.last_update_time}</td>
              <td className="text-left ">{validator.score}</td>
              <td className="text-left ">{validator.rollupname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { ValidatorTable }
