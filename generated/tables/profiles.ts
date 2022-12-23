import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface profilesAttributes {
  id: string;
  userId: string;
  username?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type profilesPk = "id";
export type profilesId = profiles[profilesPk];
export type profilesOptionalAttributes = "id" | "username" | "website" | "createdAt" | "updatedAt" | "deletedAt";
export type profilesCreationAttributes = Optional<profilesAttributes, profilesOptionalAttributes>;

export class profiles extends Model<profilesAttributes, profilesCreationAttributes> implements profilesAttributes {
  id!: string;
  userId!: string;
  username?: string;
  website?: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof profiles {
    return profiles.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: "profiles_user_id_key",
      field: 'user_id'
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    website: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now'),
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now'),
      field: 'updated_at'
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deleted_at'
    }
  }, {
    sequelize,
    tableName: 'profiles',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "profiles_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "profiles_user_id_key",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
