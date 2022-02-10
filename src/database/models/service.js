module.exports = (sequelize, DataTypes)=>{

    // console.log(sequelize.__proto__);

    class Service extends sequelize.Model {
        static defineConstraints(models){
            Service.hasMany(models.Subscriber, {foreignKey:'service_id'})
        }
    }

    Service.init ({
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: 'id'},
        title: {type: DataTypes.STRING(250), field: 'title'},
        description: {type: DataTypes.STRING(250), field: 'description'},
        
        
    },{
        sequelize,
        modelName:'services',
        tableName:'services',
        timestamps:true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
        
    });
    
    return Service;
};