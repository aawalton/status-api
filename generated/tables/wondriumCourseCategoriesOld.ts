import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface wondriumCourseCategoriesOldAttributes {
  id: number;
  courseId: number;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  achievementId?: string;
  idUuid?: string;
  courseUuid?: string;
  categoryUuid?: string;
}

export type wondriumCourseCategoriesOldPk = "id";
export type wondriumCourseCategoriesOldId = wondriumCourseCategoriesOld[wondriumCourseCategoriesOldPk];
export type wondriumCourseCategoriesOldOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt" | "achievementId" | "idUuid" | "courseUuid" | "categoryUuid";
export type wondriumCourseCategoriesOldCreationAttributes = Optional<wondriumCourseCategoriesOldAttributes, wondriumCourseCategoriesOldOptionalAttributes>;

export class wondriumCourseCategoriesOld extends Model<wondriumCourseCategoriesOldAttributes, wondriumCourseCategoriesOldCreationAttributes> implements wondriumCourseCategoriesOldAttributes {
  id!: number;
  courseId!: number;
  categoryId!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  achievementId?: string;
  idUuid?: string;
  courseUuid?: string;
  categoryUuid?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof wondriumCourseCategoriesOld {
    return wondriumCourseCategoriesOld.init({
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
    },
    idUuid: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4,
      field: 'id_uuid'
    },
    courseUuid: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4,
      field: 'course_uuid'
    },
    categoryUuid: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4,
      field: 'category_uuid'
    }
  }, {
    sequelize,
    tableName: 'wondrium_course_categories_old',
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
