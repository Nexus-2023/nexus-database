import Image from "next/image"
import { ValidatorTable } from "@/components/tables"
async function getValidators() {
  try {
    const response = await fetch("http://localhost:3000/api/Validators", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    return result
  } catch (e) {
    console.log("response error ", e)
  }
}

export default async function Home() {
  const result = await getValidators()
  console.log(" result", result.data)
  return (
    <>
      {result ? (
        <>
          <ValidatorTable list={result.data} />
        </>
      ) : (
        <>Fetching Data ...</>
      )}
    </>
  )
}
