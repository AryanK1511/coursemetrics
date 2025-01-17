// database/models/UserProfile.ts

import { DataTypes, Model } from 'sequelize';
import { sequelizeInstance } from '../sequelizeInstance';
import User from './User';

// Ref: https://sequelize.org/docs/v6/core-concepts/model-basics/
class UserProfile extends Model {}

/**
 *
 *
 */

UserProfile.init(
  {
    profile_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'user_id',
      },
    },
    bio: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeInstance,

    tableName: 'user_profiles',
  }
);

export default UserProfile;
