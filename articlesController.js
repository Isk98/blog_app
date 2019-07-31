'use strict'
const Model = require('./models')
const sequelize = Model.sequelize
var logger = require('./src/utils/logger')

function ArticleController (req, res)
{
        this.list = async () => {
            try {

                const result = await sequelize.query( 'SELECT * FROM Article',
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
                    'SELECT * FROM Article WHERE id = :articleId',
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
                const { title, body, author, createdAt, updatedAt } = req.body;
                await sequelize.query('INSERT INTO Article(title, body, author, createdAt, updatedAt) VALUES(:title, :body, :author, :createdAt, :updatedAt)',
                 {
                    replacements: {
                        title,
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
                const { title, body, author, createdAt, updatedAt } = req.body;
                await sequelize.query('UPDATE Article SET title = :title, body = :body, author = :author, createdAt = :createdAt, updatedAt = :updatedAt WHERE id = :articleId',
                 {
                    replacements: {
                        title,
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
                await sequelize.query('DELETE FROM Article WHERE id = :articleId', 
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

