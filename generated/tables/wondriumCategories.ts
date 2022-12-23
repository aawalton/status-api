import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achievements, achievementsId } from './achievements';

export interface wondriumCategoriesAttributes {
  id: string;
  url: string;
  title?: string;
  parentCategoryId?: string;
  achievementId?: string;
  indexedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type wondriumCategoriesPk = "id";
export type wondriumCategoriesId = wondriumCategories[wondriumCategoriesPk];
export type wondriumCategoriesOptionalAttributes = "id" | "title" | "parentCategoryId" | "achievementId" | "indexedAt" | "createdAt" | "updatedAt" | "deletedAt";
export type wondriumCategoriesCreationAttributes = Optional<wondriumCategoriesAttributes, wondriumCategoriesOptionalAttributes>;

export class wondriumCategories extends Model<wondriumCategoriesAttributes, wondriumCategoriesCreationAttributes> implements wondriumCategoriesAttributes {
  id!: string;
  url!: string;
  title?: string;
  parentCategoryId?: string;
  achievementId?: string;
  indexedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // wondriumCategories belongsTo achievements via achievementId
  achievement!: achievements;
  getAchievement!: Sequelize.BelongsToGetAssociationMixin<achievements>;
  setAchievement!: Sequelize.BelongsToSetAssociationMixin<achievements, achievementsId>;
  createAchievement!: Sequelize.BelongsToCreateAssociationMixin<achievements>;

  static initModel(sequelize: Sequelize.Sequelize): typeof wondriumCategories {
    return wondriumCategories.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    parentCategoryId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'parent_category_id'
    },
    achievementId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'achievements',
        key: 'id'
      },
      field: 'achievement_id'
    },
    indexedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now'),
      field: 'indexed_at'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now'),
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
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
    tableName: 'wondrium_categories',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "wondrium_categories_pkey1",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "wondrium_categories_title_parent_category_id_idx",
        unique: true,
        fields: [
          { name: "title" },
          { name: "parent_category_id" },
        ]
      },
      {
        name: "wondrium_categories_url_key1",
        unique: true,
        fields: [
          { name: "url" },
        ]
      },
    ]
  });
  }
}
