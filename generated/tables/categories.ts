import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achievements, achievementsId } from './achievements';
import type { colors, colorsId } from './colors';

export interface categoriesAttributes {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type categoriesPk = "id";
export type categoriesId = categories[categoriesPk];
export type categoriesOptionalAttributes = "id" | "color" | "createdAt" | "updatedAt" | "deletedAt";
export type categoriesCreationAttributes = Optional<categoriesAttributes, categoriesOptionalAttributes>;

export class categories extends Model<categoriesAttributes, categoriesCreationAttributes> implements categoriesAttributes {
  id!: string;
  name!: string;
  color!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  // categories hasMany achievements via categoryName
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
  // categories belongsTo colors via color
  colorColor!: colors;
  getColorColor!: Sequelize.BelongsToGetAssociationMixin<colors>;
  setColorColor!: Sequelize.BelongsToSetAssociationMixin<colors, colorsId>;
  createColorColor!: Sequelize.BelongsToCreateAssociationMixin<colors>;

  static initModel(sequelize: Sequelize.Sequelize): typeof categories {
    return categories.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "achievement_categories_name_key"
    },
    color: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "blue",
      references: {
        model: 'colors',
        key: 'name'
      }
    }
  }, {
    sequelize,
    tableName: 'categories',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "achievement_categories_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "achievement_categories_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
