import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { categories, categoriesId } from './categories';

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

  // achievementColors hasMany categories via color
  categories!: categories[];
  getCategories!: Sequelize.HasManyGetAssociationsMixin<categories>;
  setCategories!: Sequelize.HasManySetAssociationsMixin<categories, categoriesId>;
  addCategory!: Sequelize.HasManyAddAssociationMixin<categories, categoriesId>;
  addCategories!: Sequelize.HasManyAddAssociationsMixin<categories, categoriesId>;
  createCategory!: Sequelize.HasManyCreateAssociationMixin<categories>;
  removeCategory!: Sequelize.HasManyRemoveAssociationMixin<categories, categoriesId>;
  removeCategories!: Sequelize.HasManyRemoveAssociationsMixin<categories, categoriesId>;
  hasCategory!: Sequelize.HasManyHasAssociationMixin<categories, categoriesId>;
  hasCategories!: Sequelize.HasManyHasAssociationsMixin<categories, categoriesId>;
  countCategories!: Sequelize.HasManyCountAssociationsMixin;

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
