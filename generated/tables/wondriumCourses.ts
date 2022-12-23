import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface wondriumCoursesAttributes {
  id: string;
  url: string;
  title?: string;
  description?: string;
  episodes?: number;
  indexedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type wondriumCoursesPk = "id";
export type wondriumCoursesId = wondriumCourses[wondriumCoursesPk];
export type wondriumCoursesOptionalAttributes = "id" | "title" | "description" | "episodes" | "indexedAt" | "createdAt" | "updatedAt" | "deletedAt";
export type wondriumCoursesCreationAttributes = Optional<wondriumCoursesAttributes, wondriumCoursesOptionalAttributes>;

export class wondriumCourses extends Model<wondriumCoursesAttributes, wondriumCoursesCreationAttributes> implements wondriumCoursesAttributes {
  id!: string;
  url!: string;
  title?: string;
  description?: string;
  episodes?: number;
  indexedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof wondriumCourses {
    return wondriumCourses.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
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
      allowNull: true,
      defaultValue: 0
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
    tableName: 'wondrium_courses',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "wondrium_courses_pkey1",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "wondrium_courses_url_key1",
        unique: true,
        fields: [
          { name: "url" },
        ]
      },
    ]
  });
  }
}
