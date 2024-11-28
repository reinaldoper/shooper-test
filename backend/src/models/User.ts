import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database'; 
class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date; 
    public readonly updatedAt!: Date; 

    public static associate(models: any) {
        User.hasMany(models.Ride, { foreignKey: 'customer_id' });
    }
}


User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize, 
    modelName: 'User',
    timestamps: true, 
});

export default User;