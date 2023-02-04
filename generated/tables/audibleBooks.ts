import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface audibleBooksAttributes {
  id: string;
  title: string;
  url: string;
  series?: string;
  length?: string;
  language?: string;
  released?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type audibleBooksPk = "id";
export type audibleBooksId = audibleBooks[audibleBooksPk];
export type audibleBooksOptionalAttributes = "id" | "series" | "length" | "language" | "released" | "createdAt" | "updatedAt" | "deletedAt";
export type audibleBooksCreationAttributes = Optional<audibleBooksAttributes, audibleBooksOptionalAttributes>;

export class audibleBooks extends Model<audibleBooksAttributes, audibleBooksCreationAttributes> implements audibleBooksAttributes {
  id!: string;
  title!: string;
  url!: string;
  series?: string;
  length?: string;
  language?: string;
  released?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof audibleBooks {
    return audibleBooks.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "audible_books_url_key"
    },
    series: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    length: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    language: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    released: {
      type: DataTypes.TEXT,
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
    }
  }, {
    sequelize,
    tableName: 'audible_books',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "audible_books_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "audible_books_url_key",
        unique: true,
        fields: [
          { name: "url" },
        ]
      },
    ]
  });
  }
}
