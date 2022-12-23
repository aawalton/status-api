import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achievementColors, achievementColorsId } from './achievementColors';
import type { achievements, achievementsId } from './achievements';

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

  // categories belongsTo achievementColors via color
  colorAchievementColor!: achievementColors;
  getColorAchievementColor!: Sequelize.BelongsToGetAssociationMixin<achievementColors>;
  setColorAchievementColor!: Sequelize.BelongsToSetAssociationMixin<achievementColors, achievementColorsId>;
  createColorAchievementColor!: Sequelize.BelongsToCreateAssociationMixin<achievementColors>;
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
        model: 'achievement_colors',
        key: 'name'
      }
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
    tableName: 'categories',
    schema: 'public',
    timestamps: false,
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
