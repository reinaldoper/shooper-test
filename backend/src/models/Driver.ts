import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database'; 

class Driver extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public vehicle!: string;
    public rating!: number;
    public rate_per_km!: number;
    public readonly createdAt!: Date; 
    public readonly updatedAt!: Date; 

    public static associate(models: any) {
        Driver.hasMany(models.Ride, { foreignKey: 'driver_id' });
    }
}

Driver.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vehicle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    rate_per_km: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Driver',
    timestamps: true, 
});

export default Driver;