import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface wondriumCourseCategoriesAttributes {
  id: number;
  courseId: number;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  achievementId?: string;
}

export type wondriumCourseCategoriesPk = "id";
export type wondriumCourseCategoriesId = wondriumCourseCategories[wondriumCourseCategoriesPk];
export type wondriumCourseCategoriesOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt" | "achievementId";
export type wondriumCourseCategoriesCreationAttributes = Optional<wondriumCourseCategoriesAttributes, wondriumCourseCategoriesOptionalAttributes>;

export class wondriumCourseCategories extends Model<wondriumCourseCategoriesAttributes, wondriumCourseCategoriesCreationAttributes> implements wondriumCourseCategoriesAttributes {
  id!: number;
  courseId!: number;
  categoryId!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  achievementId?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof wondriumCourseCategories {
    return wondriumCourseCategories.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    courseId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'course_id'
    },
    categoryId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'category_id'
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
    achievementId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'achievement_id'
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
        name: "wondrium_course_categories_course_id_category_id_idx",
        unique: true,
        fields: [
          { name: "course_id" },
          { name: "category_id" },
        ]
      },
      {
        name: "wondrium_course_categories_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
