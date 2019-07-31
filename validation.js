const fs = require('fs')
const BaseJoi = require('joi')
const ImageExtension = require('joi-image-extension')
const concat = require('concat-stream')
var logger = require('./src/utils/logger')


const Joi = BaseJoi.extend(ImageExtension)

const imageValidation = (req, res, next) => {
    const schema = Joi
  .image()
  .minDimensions(600, 340)
  .maxDimensions(1500, 845)
  .allowTypes(['png', 'jpg'])
 
fs
  .createReadStream('./public/image.jpg')
  .pipe(concat(image => {
    Joi.validate(image, schema, (error, value) => {
        if(error) {
            logger.info(error.message)
            return res.status(413).send({error: error.message})
           
        }
        
     })
  }))

}

const articleValidation = (req, res, next) => {
    const schema = Joi.object().keys({
        title: Joi.string().alphanum().min(3).max(30).required(),
        author: Joi.string().alphanum().min(20).max(250).required(),
        body: Joi.string().alphanum().min(30).max(500).required()
    })
    
    const validation = Joi.validate({title: 'abc', author: 'abccc'}, schema)
    const {error, value} = validation
    logger.info(error.message);
    if(error) {
        return res.status(413).send({error: error.message})
    }


    res.send('Validimi pati sukses')
}


module.exports = {articleValidation, imageValidation}