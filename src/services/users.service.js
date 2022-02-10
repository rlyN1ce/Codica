const 
    express = require ('express');
    const models = require('../database');
    BaseService = require('./base.service');
    db = require ('../database');
    moment = require ('moment');
    sequelize = require('sequelize')
    


class UserService extends BaseService{
    constructor(app,ctx){
        super (app, ctx, '/u', db.User);
    }

// Обработать ошибку уже имеющегося имеила
    async userCreate(req,res){
        let newUser = await db.User.create({
            ...req.body
        })
        res.send({
            ...req.body})
      
    }

    async showUser (req,res){
        let user = await db.User.findByPk(req.params.id)
        if(user === null){
            res.status(400).send({code:4, message:'user not found'})
        }else{
            res.send({user})
        }
    }


    async serviceCreateByUser(req,res){
        let user = await db.User.findByPk(req.params.id)
        let newService = await db.Service.create({
            user_id:user.id,
            title:req.body.title,
            description:req.body.description
        })
        res.send('Ok')
    }

    async serviceCreate(req,res){
        let newService = await db.Service.create({
            ...req.body
        })
        res.send({newService})
    }

    async serviceUpdate (req,res){
        let serv = await db.Service.findOne({
            where:{
                id:req.params.id
            }
        })
        let updateService = await serv.update({
            ...req.body
        })
        res.send({updateService})
    }

    async showAllServices (req,res){
        let services = await db.Service.findAll()
        if(services === undefined){
            res.status(400).send({code:4, message: 'No services yet'})
        }else{
            res.send({services})
        }  
    }
//Обработать повторную подписку, продление подписки и т.д.
    async subscribe (req,res){
        let user = await db.User.findOne({
            where:{
                id:req.params.id
            }
        })
        let service = await db.Service.findOne({
            where:{
                id:req.body.id
            }
        })
        console.log(service.id);
        let sub = await db.Subscriber.create({
            user_id:user.id,
            service_id:service.id,
            expiredAt:moment().add(3,'d').toDate()
            
        })
        
        res.status(200).send({code:0, message:"you are subcribe on"})
    }


    async showServicesByUser(req,res){
        let user = await db.User.findOne({
            where:{
                id:req.params.id
            },
            // include: [
            //     {model:db.Subscriber,
            //     where:{
            //         user_id:user.id
            //     }}
            // ],
        });
        let usersSubs = await db.Subscriber.findAll({
            where:{
                user_id:user.id
            }
        })
        let idServ =[];        
        for(let serv of usersSubs){
            idServ.push(serv.service_id)      
        }
        let services = await db.Service.findAll({
            where:{
                id:idServ
            }
        })
        
        res.send({services})

    }

    async deleteServ(req,res){
        let destroy = await db.Service.destroy({
            where:{
                id:req.params.id
            }
        })
        res.send('Deleted')
    }

    async deleteSubs(req,res){
        let destroy = await db.Subscriber.destroy({
            where:{
                id:req.params.id
            }
        })
        res.send('Deleted')
    }


    // SaleItem.findAll({
    //     attributes: ['itemId', [sequelize.fn('count', sequelize.col('itemId')), 'count']],
    //     group : ['SaleItem.itemId'],
    //     raw: true,
    //     order: sequelize.literal('count DESC')
    //   });





    async popularServices(req,res){    
        let mostPopularServices = await db.Subscriber.findAll({             
            attributes:['service_id', sequelize.fn('count', sequelize.col('service_id')),'service_id'],
            include:[
                {model:db.Service}
            ],
            group:['service.id', 'service_id'],
            raw:true,
            order:[['count', 'DESC']],                           
        },
       )


        res.send(mostPopularServices)

    }






    createRoutes(router){
        router.get('/user/:id', this.wrap(this.showUser));
        router.post('/newuser', this.wrap(this.userCreate));

        router.post('/newservice', this.wrap(this.serviceCreate));

        router.post('/newservicebyuser/:id', this.wrap(this.serviceCreateByUser))

        router.post('/subscribe/:id',this.wrap (this.subscribe));

        // show service by user
        router.get('/allservices/:id', this.wrap (this.showServicesByUser))

        //delete service
        router.delete('/deleteservice/:id', this.wrap (this.deleteServ))

        //delete subscriber
        router.delete('/deletesubs/:id', this.wrap (this.deleteSubs))

        // updateService
        router.put('/updateservice/:id', this.wrap(this.serviceUpdate))

        router.get('/popularservices', this.wrap (this.popularServices))
    }



}
module.exports = UserService;


