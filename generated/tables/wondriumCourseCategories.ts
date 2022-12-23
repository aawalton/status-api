import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achievements, achievementsId } from './achievements';

export interface wondriumCourseCategoriesAttributes {
  id: string;
  courseId: string;
  categoryId: string;
  achievementId?: string;
  indexedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type wondriumCourseCategoriesPk = "id";
export type wondriumCourseCategoriesId = wondriumCourseCategories[wondriumCourseCategoriesPk];
export type wondriumCourseCategoriesOptionalAttributes = "id" | "achievementId" | "indexedAt" | "createdAt" | "updatedAt" | "deletedAt";
export type wondriumCourseCategoriesCreationAttributes = Optional<wondriumCourseCategoriesAttributes, wondriumCourseCategoriesOptionalAttributes>;

export class wondriumCourseCategories extends Model<wondriumCourseCategoriesAttributes, wondriumCourseCategoriesCreationAttributes> implements wondriumCourseCategoriesAttributes {
  id!: string;
  courseId!: string;
  categoryId!: string;
  achievementId?: string;
  indexedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // wondriumCourseCategories belongsTo achievements via achievementId
  achievement!: achievements;
  getAchievement!: Sequelize.BelongsToGetAssociationMixin<achievements>;
  setAchievement!: Sequelize.BelongsToSetAssociationMixin<achievements, achievementsId>;
  createAchievement!: Sequelize.BelongsToCreateAssociationMixin<achievements>;

  static initModel(sequelize: Sequelize.Sequelize): typeof wondriumCourseCategories {
    return wondriumCourseCategories.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'course_id'
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'category_id'
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
    tableName: 'wondrium_course_categories',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "wondrium_course_categories_course_id_category_id_key",
        unique: true,
        fields: [
          { name: "course_id" },
          { name: "category_id" },
        ]
      },
      {
        name: "wondrium_course_categories_pkey1",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
