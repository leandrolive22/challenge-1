const swaggerAutogen = require('swagger-autogen')()
// eslint-disable-next-line @typescript-eslint/no-var-requires  
require('dotenv').config();

const doc = {
    info: {
        title: "Desafio",
        description: "Description"
    },
    schemes: ['http', 'https']
}

const outputFile = './swagger_output.json'
const endpointsFiles = ["./src/modules/routes/index.ts"]
 
swaggerAutogen(outputFile, endpointsFiles, doc)
