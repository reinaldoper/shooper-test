import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

class Ride extends Model {
    public id!: number;
    public customer_id!: string;
    public origin!: string;
    public destination!: string;
    public distance!: number;
    public duration!: string;
    public driver_id!: number;
    public value!: number;
    public readonly createdAt!: Date; 
    public readonly updatedAt!: Date; 

    public static associate(models: any) {
        Ride.belongsTo(models.Driver, { foreignKey: 'driver_id' });
    }
}

Ride.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    customer_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    distance: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    driver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Ride',
    timestamps: true, 
});

export default Ride;