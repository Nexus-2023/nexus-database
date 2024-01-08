async function getValidators() {
  try {
    const response = await fetch("http://localhost:3000/api/Validators", {
      method: "GET",
      cache: "no-store",
      // next: { revalidate: 60 },
    })

    const result = await response.json()
    // console.log("restult ", result)
    return result
  } catch (e) {
    console.log("response error ", e)
  }
}

async function postValidator({ validator }) {
  try {
    const response = await fetch("http://localhost:3000/api/Validators", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ validator }),
    })

    if (!response.ok) {
      throw new Error("Failed to create validator.")
    }

    const data = await response.json()
    // console.log(data.result)

    return data
  } catch (error) {
    console.error("Error creating validator:", error)
  }
}

async function updateValidator({ validator }) {
  try {
    const response = await fetch(
      "http://localhost:3000/api/Validators/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ validator }),
      }
    )

    if (!response.ok) {
      throw new Error("Failed to create validator.")
    }

    const data = await response.json()
    // console.log(data.result)

    return data
  } catch (error) {
    console.error("Error creating validator:", error)
  }
}

async function getNodeOperators() {
  try {
    const response = await fetch("http://localhost:3000/api/Node", {
      method: "GET",
      cache: "no-store",
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
      cache: "no-store",
    })

    const result = await response.json()

    return result
  } catch (e) {
    console.log("response error ", e)
  }
}

async function postBlocks({ block }) {
  try {
    const response = await fetch("http://localhost:3000/api/Blocks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ block }),
    })

    if (!response.ok) {
      throw new Error("Failed to create block.")
    }

    const data = await response.json()
    // console.log(data.result)

    return data
  } catch (error) {
    console.error("Error creating block:", error)
  }
}

async function updateBlock({ updatedBlock }) {
  try {
    const response = await fetch("http://localhost:3000/api/Blocks/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updatedBlock }),
    })

    if (!response.ok) {
      throw new Error("Failed to update block.")
    }

    const data = await response.json()
    // console.log(data.result)

    return data
  } catch (error) {
    console.error("Error updating block:", error)
  }
}

export {
  getBlocks,
  getNodeOperators,
  getValidators,
  postValidator,
  updateValidator,
  postBlocks,
  updateBlock,
}
