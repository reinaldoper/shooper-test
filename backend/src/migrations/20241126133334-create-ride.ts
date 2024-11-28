import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    // Criação da tabela Rides
    await queryInterface.createTable('Rides', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_id: {
        type: DataTypes.INTEGER, 
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
        allowNull: true, 
      },
      value: {
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
      fields: ['customer_id'],
      type: 'foreign key',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE', 
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

    await queryInterface.removeConstraint('Rides', 'fk_rides_customer_id');
    await queryInterface.removeConstraint('Rides', 'fk_rides_driver_id');

    
    await queryInterface.dropTable('Rides');
  }
};