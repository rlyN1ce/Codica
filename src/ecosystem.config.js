module.exports = {
  apps:[
    {
        name: 'codica',
        script: './bin/www',
        dialect: 'postgres',
        env: {
            NODE_ENV: 'production'
        }
    }
]
 

}
  