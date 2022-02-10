
module.exports = (sequelize, DataTypes)=>{
    // console.log(sequelize.__proto__);
    class User extends sequelize.Model {
        static defineConstraints(models){
            User.hasMany(models.Subscriber,{foreignKey:'user_id'})
        }
    }

    User.init ({
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: 'id'},
        email: {type: DataTypes.STRING(250), field: 'email'},
        name: {type: DataTypes.STRING(250), field: 'name'}
    },{
        sequelize,
        modelName:'users',
        tableName:'users',
        timestamps:true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
        
    });
    
    return User;
};