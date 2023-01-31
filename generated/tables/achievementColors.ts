import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achievementCategories, achievementCategoriesId } from './achievementCategories';

export interface achievementColorsAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type achievementColorsPk = "id";
export type achievementColorsId = achievementColors[achievementColorsPk];
export type achievementColorsOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type achievementColorsCreationAttributes = Optional<achievementColorsAttributes, achievementColorsOptionalAttributes>;

export class achievementColors extends Model<achievementColorsAttributes, achievementColorsCreationAttributes> implements achievementColorsAttributes {
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  // achievementColors hasMany achievementCategories via color
  achievementCategories!: achievementCategories[];
  getAchievementCategories!: Sequelize.HasManyGetAssociationsMixin<achievementCategories>;
  setAchievementCategories!: Sequelize.HasManySetAssociationsMixin<achievementCategories, achievementCategoriesId>;
  addAchievementCategory!: Sequelize.HasManyAddAssociationMixin<achievementCategories, achievementCategoriesId>;
  addAchievementCategories!: Sequelize.HasManyAddAssociationsMixin<achievementCategories, achievementCategoriesId>;
  createAchievementCategory!: Sequelize.HasManyCreateAssociationMixin<achievementCategories>;
  removeAchievementCategory!: Sequelize.HasManyRemoveAssociationMixin<achievementCategories, achievementCategoriesId>;
  removeAchievementCategories!: Sequelize.HasManyRemoveAssociationsMixin<achievementCategories, achievementCategoriesId>;
  hasAchievementCategory!: Sequelize.HasManyHasAssociationMixin<achievementCategories, achievementCategoriesId>;
  hasAchievementCategories!: Sequelize.HasManyHasAssociationsMixin<achievementCategories, achievementCategoriesId>;
  countAchievementCategories!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof achievementColors {
    return achievementColors.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "colors_name_key"
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
    tableName: 'achievement_colors',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "colors_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "colors_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
