import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface wondriumCourseCategoriesAttributes {
  id: number;
  courseId: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type wondriumCourseCategoriesPk = "id";
export type wondriumCourseCategoriesId = wondriumCourseCategories[wondriumCourseCategoriesPk];
export type wondriumCourseCategoriesOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type wondriumCourseCategoriesCreationAttributes = Optional<wondriumCourseCategoriesAttributes, wondriumCourseCategoriesOptionalAttributes>;

export class wondriumCourseCategories extends Model<wondriumCourseCategoriesAttributes, wondriumCourseCategoriesCreationAttributes> implements wondriumCourseCategoriesAttributes {
  id!: number;
  courseId!: number;
  categoryId!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


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
    }
  }, {
    sequelize,
    tableName: 'wondrium_course_categories',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
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
