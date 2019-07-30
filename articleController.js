'use strict'
const Model = require('./models')
const sequelize = Model.sequelize
var logger = require('./src/utils/logger')

function ArticleController (req, res)
{
        this.list = async () => {
            try {

                const result = await sequelize.query( 'SELECT * FROM ARTICLES',
                {
                   type: sequelize.QueryTypes.SELECT
                })
   
               res.json(result)
                
            } catch (error) {
                return res.send(error.message)
                
            }
           logger.info('success')
           
        }
        this.add = async () => {
            const { title, body, author, createdAt, updatedAt } = req.body;
            await sequelize.query('INSERT INTO Articles(title, body, author, createdAt, updatedAt) VALUES(:title, :body, :author, :createdAt, :updatedAt)',
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
            
            res.send('done')
        }
        this.update = async () => {
            const articleId = req.params.id;
            const { title, body, author, createdAt, updatedAt } = req.body;
            await sequelize.query('UPDATE Articles SET title = :title, body = :body, author = :author, createdAt = :createdAt, updatedAt = :updatedAt WHERE id = :articleId',
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
            logger.info('article updated');
            res.send('success')
        }
        this.delete = async () => {
            const articleId = req.params.id;
            await sequelize.query('DELETE FROM Articles WHERE id = :articleId', 
            {
                replacements: {
                    articleId
                },
                type: sequelize.QueryTypes.DELETE
            })
            logger.info('article deleted');
            res.send('success')

        }
    }


module.exports = ArticleController

