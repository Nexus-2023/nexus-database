import { NextResponse, NextRequest } from "next/server"

import { promises as fsPromises } from "fs"
import { Client, Pool } from "pg"

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASENAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
})

export async function POST(req, res) {
  const client = await pool.connect()
  try {
    const Data = await req.json()
    // console.log("Data", Data.block)
    // const { public_key, balance, status, score } = Data.block
    const {
      block_number,

      root,
      finalized,
    } = Data.block
    const result = await pool.query(
      "UPDATE blocks SET root = $1, finalized = $2, last_update_time = NOW() WHERE block_number = $4 RETURNING *",
      [root, finalized, score, block_number]
    )

    return NextResponse.json(
      { data: result.rows, result: "block Updated successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error updating block data:", error)
    return NextResponse.json(
      { message: "Internal Error updating block" },
      { status: 500 }
    )
  } finally {
    client.release()
  }
}
