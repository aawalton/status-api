import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achievements, achievementsId } from './achievements';

export interface achievementPointsAttributes {
  id: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type achievementPointsPk = "id";
export type achievementPointsId = achievementPoints[achievementPointsPk];
export type achievementPointsOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type achievementPointsCreationAttributes = Optional<achievementPointsAttributes, achievementPointsOptionalAttributes>;

export class achievementPoints extends Model<achievementPointsAttributes, achievementPointsCreationAttributes> implements achievementPointsAttributes {
  id!: string;
  points!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  // achievementPoints hasMany achievements via points
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

  static initModel(sequelize: Sequelize.Sequelize): typeof achievementPoints {
    return achievementPoints.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "achievement_points_points_key"
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
    tableName: 'achievement_points',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "achievement_points_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "achievement_points_points_key",
        unique: true,
        fields: [
          { name: "points" },
        ]
      },
    ]
  });
  }
}
