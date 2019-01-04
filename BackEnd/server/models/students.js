module.exports = (sequelize, DataTypes) =>{
    const students=sequelize.define('academia.students',{
        pk:{
            primaryKey:true,
            autoIncrement: true,
            type:DataTypes.BIGINT
            
        },
        rut:DataTypes.INTEGER,
        first_name:DataTypes.STRING,
        last_name: DataTypes.STRING,
        gender: DataTypes.INTEGER,
        birthdate: DataTypes.DATE,
        students_creacion:DataTypes.STRING


    });
    return students;
}