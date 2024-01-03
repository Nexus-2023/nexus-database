import { NextResponse, NextRequest } from "next/server"

import { promises as fsPromises } from "fs"
import { Client, Pool } from "pg"

// const client = new Client({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_DATABASENAME,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
// })

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASENAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
})

export async function GET(req, res) {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASENAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  })
  await client.connect()

  try {
    const result = await client.query("SELECT * FROM VALIDATORS ;")

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

export async function POST(req, res) {
  const client = await pool.connect()
  try {
    const Data = await req.json()
    console.log("Data", Data.validator)
    const {
      public_key,
      validator_index,
      cluster_id,
      balance,
      status,
      score,
      rollupname,
    } = Data.validator

    const result = await pool.query(
      "INSERT INTO VALIDATORS (public_key, validator_index, cluster_id, balance, status, last_update_time, score, rollupname) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, $6, $7) RETURNING *",
      [
        public_key,
        validator_index,
        cluster_id,
        balance,
        status,
        score,
        rollupname,
      ]
    )

    return NextResponse.json(
      { data: result.rows, result: "Validator created successfully" },
      { status: 200 }
    )
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
// CREATE TABLE Validators ( public_key TEXT PRIMARY KEY, validator_index INTEGER, cluster_id INTEGER, balance INTEGER, status TEXT, last_update_time TIMESTAMP, score INTEGER, rollupName TEXT );

// INSERT INTO Validators ( public_key, validator_index, cluster_id,  balance, status, last_update_time, score, rollupName  ) VALUES ( '0xb00b966e25f49148693bec0c6cf19f325fc42f118db1ce0ecbb70fbc607dc2e0f238b5c7011cba1e02326e5b55509da0', 645904, 1,   32002907444, 'active_ongoing', NOW(), 89, 'PlaceholderRollup'  );
