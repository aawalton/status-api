import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface exercisesAttributes {
  id: string;
  preText: string;
  postText: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  formatName: string;
  circleName: string;
}

export type exercisesPk = "id";
export type exercisesId = exercises[exercisesPk];
export type exercisesOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt" | "formatName" | "circleName";
export type exercisesCreationAttributes = Optional<exercisesAttributes, exercisesOptionalAttributes>;

export class exercises extends Model<exercisesAttributes, exercisesCreationAttributes> implements exercisesAttributes {
  id!: string;
  preText!: string;
  postText!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  formatName!: string;
  circleName!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof exercises {
    return exercises.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    preText: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'pre_text'
    },
    postText: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'post_text'
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
    formatName: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "focused",
      field: 'format_name'
    },
    circleName: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "solo",
      field: 'circle_name'
    }
  }, {
    sequelize,
    tableName: 'exercises',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "exercises_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "exercises_pre_text_post_text_key",
        unique: true,
        fields: [
          { name: "pre_text" },
          { name: "post_text" },
        ]
      },
    ]
  });
  }
}
