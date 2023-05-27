import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface oldAudibleBooksAttributes {
  id?: string;
  author?: string;
  title?: string;
  url?: string;
  series?: string;
  length?: string;
  language?: string;
  released?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type oldAudibleBooksPk = "id";
export type oldAudibleBooksId = oldAudibleBooks[oldAudibleBooksPk];
export type oldAudibleBooksOptionalAttributes = "id" | "author" | "title" | "url" | "series" | "length" | "language" | "released" | "createdAt" | "updatedAt" | "deletedAt";
export type oldAudibleBooksCreationAttributes = Optional<oldAudibleBooksAttributes, oldAudibleBooksOptionalAttributes>;

export class oldAudibleBooks extends Model<oldAudibleBooksAttributes, oldAudibleBooksCreationAttributes> implements oldAudibleBooksAttributes {
  id?: string;
  author?: string;
  title?: string;
  url?: string;
  series?: string;
  length?: string;
  language?: string;
  released?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof oldAudibleBooks {
    return oldAudibleBooks.init({
    id: {
      type: DataTypes.UUID,
      allowNull: true,
      primaryKey: true
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true
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
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at'
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deleted_at'
    }
  }, {
    sequelize,
    tableName: 'old_audible_books',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    underscored: true
  });
  }
}
