'use strict'
const Model = require('./models')
const sequelize = Model.sequelize
var logger = require('./src/utils/logger')

function ArticleController (req, res)
{
        this.list = async () => {
            try {

                const result = await sequelize.query( 'SELECT * FROM Articles',
                {
                   type: sequelize.QueryTypes.SELECT
                })

                logger.info('success')
                res.json(result)
                
            } catch (error) {
                logger.info(error.message)
                return res.send(error.message)
                
            }
           
        }
        this.show = async() => {
            try {
                const articleId = req.params.id
                const result = await sequelize.query(
                    'SELECT * FROM Articles WHERE id = :articleId',
                    {
                        replacements: {
                            articleId
                        },
                        type: sequelize.QueryTypes.SELECT
                    }
                )
                logger.info('Success') 
                res.json(result)
            } catch (error) {
                logger.info(error.message)
                return res.send(error.message)
                
            }
            
          

        }
        this.add = async () => {
            try {
                const { title, image, body, author, createdAt, updatedAt } = req.body;
                await sequelize.query('INSERT INTO Articles(title, image, body, author, createdAt, updatedAt) VALUES(:title, :image, :body, :author, :createdAt, :updatedAt)',
                 {
                    replacements: {
                        title,
                        image,
                        body,
                        author,
                        createdAt,
                        updatedAt
                    },
                    type: sequelize.QueryTypes.INSERT
                })
                logger.info('A new article is added');
               res.send('Success')
                
            } catch (error) {
                logger.info(error.message)
                return res.send(error.message)
                
            }

        }
        this.update = async () => {
            try {
                const articleId = req.params.id;
                const { title, image, body, author, createdAt, updatedAt } = req.body;
                await sequelize.query('UPDATE Articles SET title = :title, image = :image, body = :body, author = :author, createdAt = :createdAt, updatedAt = :updatedAt WHERE id = :articleId',
                 {
                    replacements: {
                        title,
                        image,
                        body,
                        author,
                        createdAt,
                        updatedAt,
                        articleId
                    },
                    type: sequelize.QueryTypes.UPDATE
                })
                logger.info('Article updated');
                res.send('Success')
            } catch (error) {
                logger.info(error.message)
                return res.send(error.message)
                
            }
  
        }
        this.delete = async () => {
            try {
                const articleId = req.params.id;
                await sequelize.query('DELETE FROM Articles WHERE id = :articleId', 
                {
                    replacements: {
                        articleId
                    },
                    type: sequelize.QueryTypes.DELETE
                })
                logger.info('Article deleted');
                res.send('Success')
                
            } catch (error) {
                logger.info(error.message)
                return res.send(error.message)
                
            }


        }
    }


module.exports = ArticleController

