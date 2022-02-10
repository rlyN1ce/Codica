module.exports = (sequelize, DataTypes)=>{


    class Subscriber extends sequelize.Model {
        static defineConstraints(models){
            Subscriber.belongsTo(models.User,{foreignKey: 'user_id'});
            Subscriber.belongsTo(models.Service, {foreignKey: 'service_id'})
        }
    }

    Subscriber.init ({
        id: {type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true, field:'id'},
        expiredAt: {type: DataTypes.DATE, field: 'expired_at'},
    },{
        sequelize,
        modelName: 'subscribers',
        tableName:'subscribers',
        timestamps: true,
        underscore: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'

        
    });
    
    return Subscriber;
};