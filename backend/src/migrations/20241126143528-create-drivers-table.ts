import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable('Drivers', {
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
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    });

    
    await queryInterface.addConstraint('Rides', {
      fields: ['driver_id'],
      type: 'foreign key',
      references: {
        table: 'Drivers',
        field: 'id',
      },
      onDelete: 'SET NULL', 
      onUpdate: 'CASCADE', 
    });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    
    await queryInterface.removeConstraint('Rides', 'fk_rides_driver_id');
    
    
    await queryInterface.dropTable('Drivers');
  }
};