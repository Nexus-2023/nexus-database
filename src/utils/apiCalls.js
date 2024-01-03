import { Login } from "@mui/icons-material"

async function getValidators() {
  try {
    const response = await fetch("http://localhost:3000/api/Validators", {
      method: "GET",
    })

    const result = await response.json()

    return result
  } catch (e) {
    console.log("response error ", e)
  }
}

async function getNodeOperators() {
  try {
    const response = await fetch("http://localhost:3000/api/Node", {
      method: "GET",
    })

    const result = await response.json()

    return result
  } catch (e) {
    console.log("response error ", e)
  }
}

async function getBlocks() {
  try {
    const response = await fetch("http://localhost:3000/api/Blocks", {
      method: "GET",
    })

    const result = await response.json()

    return result
  } catch (e) {
    console.log("response error ", e)
  }
}

export { getBlocks, getNodeOperators, getValidators }
