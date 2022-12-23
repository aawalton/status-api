import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achievements, achievementsId } from './achievements';

export interface achievementTypesAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type achievementTypesPk = "id";
export type achievementTypesId = achievementTypes[achievementTypesPk];
export type achievementTypesOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type achievementTypesCreationAttributes = Optional<achievementTypesAttributes, achievementTypesOptionalAttributes>;

export class achievementTypes extends Model<achievementTypesAttributes, achievementTypesCreationAttributes> implements achievementTypesAttributes {
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  // achievementTypes hasMany achievements via type
  achievements!: achievements[];
  getAchievements!: Sequelize.HasManyGetAssociationsMixin<achievements>;
  setAchievements!: Sequelize.HasManySetAssociationsMixin<achievements, achievementsId>;
  addAchievement!: Sequelize.HasManyAddAssociationMixin<achievements, achievementsId>;
  addAchievements!: Sequelize.HasManyAddAssociationsMixin<achievements, achievementsId>;
  createAchievement!: Sequelize.HasManyCreateAssociationMixin<achievements>;
  removeAchievement!: Sequelize.HasManyRemoveAssociationMixin<achievements, achievementsId>;
  removeAchievements!: Sequelize.HasManyRemoveAssociationsMixin<achievements, achievementsId>;
  hasAchievement!: Sequelize.HasManyHasAssociationMixin<achievements, achievementsId>;
  hasAchievements!: Sequelize.HasManyHasAssociationsMixin<achievements, achievementsId>;
  countAchievements!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof achievementTypes {
    return achievementTypes.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "achievement_types_name_key"
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
    tableName: 'achievement_types',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "achievement_types_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "achievement_types_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
