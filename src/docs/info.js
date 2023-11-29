export const info = {
    definition: {
        openapi: '3.0.0',   
        info: {
            title: 'Bazar de barrio',
            version: '0.0.9b',
            description: 'Sitio web de compras de bazar de barrio - Tecnologías utilizadas: Node, Express, MongoDB'
        },
        servers: [  
            {
                url: 'http://localhost:8080/api'
            }
        ]
    },
    apis: ['./src/docs/*.yml']
}