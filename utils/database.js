import { Sequelize } from "sequelize";
import { DataTypes } from 'sequelize';

const { DB, USER_DB, PASSWORD_DB, PORT_DB, HOST_DB, DB_NAME } = process.env

const db = new Sequelize(DB, USER_DB, PASSWORD_DB, {
    host: HOST_DB,
    port: PORT_DB,
    dialect: 'mysql',
});

db.authenticate()
    .then(() => console.log('Database connection established'))
    .catch(err => console.error('Unable to connect to the database:', err));

const User = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    pasaporte: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: DB_NAME,
    timestamps: false,
});

export const insertData = (data) => {
    const promises = data.map(async (row) => {
        return await User.create(row);
    });
    return promises
}

export default User;
