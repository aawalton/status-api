import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { categories, categoriesId } from './categories';

export interface colorsAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type colorsPk = "id";
export type colorsId = colors[colorsPk];
export type colorsOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type colorsCreationAttributes = Optional<colorsAttributes, colorsOptionalAttributes>;

export class colors extends Model<colorsAttributes, colorsCreationAttributes> implements colorsAttributes {
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  // colors hasMany categories via color
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

  static initModel(sequelize: Sequelize.Sequelize): typeof colors {
    return colors.init({
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
    }
  }, {
    sequelize,
    tableName: 'colors',
    schema: 'public',
    timestamps: true,
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
