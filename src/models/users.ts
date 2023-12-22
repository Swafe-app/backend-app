import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from "../services/sequelize";
import { v4 as uuidv4 } from 'uuid';

const SALT_ROUNDS = 10;

class User extends Model {
    declare uid: string;
    declare email: string;
    declare firstName: string;
    declare lastName: string;
    declare phoneCountryCode: string | null;
    declare phoneNumber: string | null;
    declare password: string;
    declare emailVerified: boolean;
    declare phoneVerified: boolean;
    declare role: string;
    declare verificationToken: string | null;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

User.init({
    uid: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => uuidv4()
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneCountryCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isNumeric: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    phoneVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user'
    },
    verificationToken: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
        beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync(SALT_ROUNDS);
            user.password = bcrypt.hashSync(user.password, salt);
        },
        beforeUpdate: (user) => {
            if (user.changed('password')) {
                const salt = bcrypt.genSaltSync(SALT_ROUNDS);
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    }
});

export default User;
