import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface wondriumCoursesOldAttributes {
  id: number;
  url: string;
  title?: string;
  description?: string;
  episodes?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  indexedAt?: Date;
  idUuid?: string;
}

export type wondriumCoursesOldPk = "id";
export type wondriumCoursesOldId = wondriumCoursesOld[wondriumCoursesOldPk];
export type wondriumCoursesOldOptionalAttributes = "id" | "title" | "description" | "episodes" | "createdAt" | "updatedAt" | "deletedAt" | "indexedAt" | "idUuid";
export type wondriumCoursesOldCreationAttributes = Optional<wondriumCoursesOldAttributes, wondriumCoursesOldOptionalAttributes>;

export class wondriumCoursesOld extends Model<wondriumCoursesOldAttributes, wondriumCoursesOldCreationAttributes> implements wondriumCoursesOldAttributes {
  id!: number;
  url!: string;
  title?: string;
  description?: string;
  episodes?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  indexedAt?: Date;
  idUuid?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof wondriumCoursesOld {
    return wondriumCoursesOld.init({
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
    indexedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now'),
      field: 'indexed_at'
    },
    idUuid: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4,
      field: 'id_uuid'
    }
  }, {
    sequelize,
    tableName: 'wondrium_courses_old',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "wondrium_courses_id_uuid_idx",
        unique: true,
        fields: [
          { name: "id_uuid" },
        ]
      },
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
