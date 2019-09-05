const { Pool } = require('pg')

const pool = new Pool({
    connectionString: "postgres://szdrtnxbbxmzjt:ee8904ae0328511c322e1f497edaecb2a31c32820fb187b49439d2e62e41fba6@ec2-54-246-92-116.eu-west-1.compute.amazonaws.com:5432/deld4pkd77aj54",
    ssl: true
})

async function queryHandler(query, parameters) {
    return new Promise((resolve, reject) => {
        pool.connect((connect_error, client, done) => {
            if (connect_error) {
                reject(connect_error)
            }
            else
            {
                client.query(query, parameters, (query_error, result) => {
                    done()
                    if (query_error) {
                        reject(query_error.message)
                    } else {
                        resolve(result.rows)
                    }
                })
            }
        })
    })
}

module.exports = {
    queryHandler
}

