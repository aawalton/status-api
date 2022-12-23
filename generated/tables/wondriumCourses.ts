import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface wondriumCoursesAttributes {
  id: number;
  url: string;
  title?: string;
  description?: string;
  episodes?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type wondriumCoursesPk = "id";
export type wondriumCoursesId = wondriumCourses[wondriumCoursesPk];
export type wondriumCoursesOptionalAttributes = "id" | "title" | "description" | "episodes" | "createdAt" | "updatedAt" | "deletedAt";
export type wondriumCoursesCreationAttributes = Optional<wondriumCoursesAttributes, wondriumCoursesOptionalAttributes>;

export class wondriumCourses extends Model<wondriumCoursesAttributes, wondriumCoursesCreationAttributes> implements wondriumCoursesAttributes {
  id!: number;
  url!: string;
  title?: string;
  description?: string;
  episodes?: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof wondriumCourses {
    return wondriumCourses.init({
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    episodes: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'wondrium_courses',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "wondrium_courses_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "wondrium_courses_url_key",
        unique: true,
        fields: [
          { name: "url" },
        ]
      },
    ]
  });
  }
}
