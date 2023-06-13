const bcrypt = require('bcryptjs')

const user = [
    {
        name: 'administrator',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 8),
        role: 'admin'

    },
    {
        name: 'buyer',
        email: 'buyer@gmail.com',
        password: bcrypt.hashSync('123456', 8),

    },
    {
        name: 'seller',
        email: 'seller@gmail.com',
        password: bcrypt.hashSync('123456', 8),
        role: 'seller'

    }
]

module.exports = user