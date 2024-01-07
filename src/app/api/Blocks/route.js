import { NextResponse } from "next/server"

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
    console.log("block/api/Data ", Data.block)
    const {
      block_number,
      block_proposer,
      slot,
      root,
      parent_root,

      validator_exit,
      withdrawals,
      proposer_slashings,

      finalized,
    } = Data.block

    const result = await pool.query(
      "INSERT INTO BLOCKS (block_number, block_proposer , slot, root, parent_root,validator_exit, withdrawals, proposer_slashings , finalized, last_update_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9  , CURRENT_TIMESTAMP) RETURNING *",
      [
        block_number,
        block_proposer,
        slot,
        root,
        parent_root,
        validator_exit,
        withdrawals,
        proposer_slashings,
        finalized,
      ]
    )

    return NextResponse.json(
      { data: result.rows, result: "Block Data inserted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error(" failed to insert block:", error)
    return NextResponse.json(
      { message: "Internal block failed to insert" },
      { status: 500 }
    )
  } finally {
    client.release()
  }
}

export async function GET(req, res) {
  const client = await pool.connect()

  try {
    const result = await client.query("SELECT * FROM BLOCKS;")
    // console.log("blocks result ", result)
    return NextResponse.json({ data: result.rows }, { status: 200 })
  } catch (error) {
    console.error("Error fetching data:", error)
    return NextResponse.json(
      { message: "Internal Error retrieving chats" },
      { status: 500 }
    )
  } finally {
    client.release()
  }
}

// INSERT INTO Blocks ( block_number, validator_exit, withdrawals, last_update_time ) VALUES ( 123456, ARRAY['0x1111111111111111111111111111111111111111111111111111111111111111', '0x2222222222222222222222222222222222222222222222222222222222222222'], 3, NOW() );
