let jwt = require('jsonwebtoken')
require('dotenv').config()

function login (req, res)
{
    this.create = async() =>{
      let username = 'ilva'
      let password = '123'
  
      if(username && password){
          let token = jwt.sign({username: username}, process.env.SECRET, { expiresIn: '24h'})
      
  
      res.json({
          success: true,
          message: "Authentication successful!",
          token: token
        })
    }
  else res.send(400).json({
      success: false,
      message: 'Authentication failed!'
    })
  }
    
 


}

module.exports = login