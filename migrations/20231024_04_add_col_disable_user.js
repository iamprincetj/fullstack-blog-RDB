const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('sessions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });

    await queryInterface.addColumn('users', 'session_id', {
      type: DataTypes.INTEGER,
      references: { model: 'sessions', key: 'id' },
    });

    await queryInterface.addColumn('users', 'disabled', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('sessions');
    await queryInterface.removeColumn('users', 'disabled');
  },
};
