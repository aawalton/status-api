import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface wondriumCategoriesAttributes {
  id: number;
  url: string;
  title?: string;
  parentCategoryId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type wondriumCategoriesPk = "id";
export type wondriumCategoriesId = wondriumCategories[wondriumCategoriesPk];
export type wondriumCategoriesOptionalAttributes = "id" | "title" | "parentCategoryId" | "createdAt" | "updatedAt" | "deletedAt";
export type wondriumCategoriesCreationAttributes = Optional<wondriumCategoriesAttributes, wondriumCategoriesOptionalAttributes>;

export class wondriumCategories extends Model<wondriumCategoriesAttributes, wondriumCategoriesCreationAttributes> implements wondriumCategoriesAttributes {
  id!: number;
  url!: string;
  title?: string;
  parentCategoryId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof wondriumCategories {
    return wondriumCategories.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
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
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'parent_category_id'
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
        name: "wondrium_categories_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "wondrium_categories_url_key",
        unique: true,
        fields: [
          { name: "url" },
        ]
      },
    ]
  });
  }
}
