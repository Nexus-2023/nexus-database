import { NextResponse } from "next/server"

import { promises as fsPromises } from "fs"
import { Client } from "pg"

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASENAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
})

export async function GET(req, res) {
  await client.connect()

  try {
    const result = await client.query("SELECT * FROM NODEOPERATORS;")
    console.log("node result ", result)
    return NextResponse.json({ data: result.rows }, { status: 200 })
  } catch (error) {
    console.error("Error fetching data:", error)
    return NextResponse.json(
      { message: "Internal Error retrieving chats" },
      { status: 500 }
    )
  } finally {
    await client.end()
  }
}

// INSERT INTO NodeOperators ( name, public_key, validator_count, score, last_update_time, node_operator_id, cluster_id ) VALUES ( 'Node Operator 1', '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', 10, 85, NOW(), 1, 1 );
