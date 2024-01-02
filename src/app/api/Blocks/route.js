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
    const result = await client.query("SELECT * FROM BLOCKS;")
    console.log("blocks result ", result)
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

// INSERT INTO Blocks ( block_number, validator_exit, withdrawals, last_update_time ) VALUES ( 123456, ARRAY['0x1111111111111111111111111111111111111111111111111111111111111111', '0x2222222222222222222222222222222222222222222222222222222222222222'], 3, NOW() );
