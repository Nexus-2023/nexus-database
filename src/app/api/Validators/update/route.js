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
    console.log("Data", Data.validator)
    const { public_key, balance, status, score } = Data.validator

    const result = await pool.query(
      "UPDATE validators SET balance = $1, status = $2, score = $3 , last_update_time = NOW() WHERE public_key = $4 RETURNING *",
      [balance, status, score, public_key]
    )

    return NextResponse.json(
      { data: result.rows, result: "Validator Updated successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error updating validator data:", error)
    return NextResponse.json(
      { message: "Internal Error updating validator" },
      { status: 500 }
    )
  } finally {
    client.release()
  }
}
