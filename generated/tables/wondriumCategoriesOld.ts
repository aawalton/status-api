import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface wondriumCategoriesOldAttributes {
  id: number;
  url: string;
  title?: string;
  parentCategoryId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  indexedAt?: Date;
  achievementId?: string;
  idUuid?: string;
  parentCategoryUuid?: string;
}

export type wondriumCategoriesOldPk = "id";
export type wondriumCategoriesOldId = wondriumCategoriesOld[wondriumCategoriesOldPk];
export type wondriumCategoriesOldOptionalAttributes = "id" | "title" | "parentCategoryId" | "createdAt" | "updatedAt" | "deletedAt" | "indexedAt" | "achievementId" | "idUuid" | "parentCategoryUuid";
export type wondriumCategoriesOldCreationAttributes = Optional<wondriumCategoriesOldAttributes, wondriumCategoriesOldOptionalAttributes>;

export class wondriumCategoriesOld extends Model<wondriumCategoriesOldAttributes, wondriumCategoriesOldCreationAttributes> implements wondriumCategoriesOldAttributes {
  id!: number;
  url!: string;
  title?: string;
  parentCategoryId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  indexedAt?: Date;
  achievementId?: string;
  idUuid?: string;
  parentCategoryUuid?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof wondriumCategoriesOld {
    return wondriumCategoriesOld.init({
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
    },
    indexedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now'),
      field: 'indexed_at'
    },
    achievementId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'achievement_id'
    },
    idUuid: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4,
      field: 'id_uuid'
    },
    parentCategoryUuid: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4,
      field: 'parent_category_uuid'
    }
  }, {
    sequelize,
    tableName: 'wondrium_categories_old',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "wondrium_categories_id_uuid_idx",
        unique: true,
        fields: [
          { name: "id_uuid" },
        ]
      },
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
