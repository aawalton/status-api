import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface esoCharactersAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  rank: number;
}

export type esoCharactersPk = "id";
export type esoCharactersId = esoCharacters[esoCharactersPk];
export type esoCharactersOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type esoCharactersCreationAttributes = Optional<esoCharactersAttributes, esoCharactersOptionalAttributes>;

export class esoCharacters extends Model<esoCharactersAttributes, esoCharactersCreationAttributes> implements esoCharactersAttributes {
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;
  rank!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof esoCharacters {
    return esoCharacters.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now'),
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now'),
      field: 'updated_at'
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deleted_at'
    },
    rank: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'eso_characters',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "eso_characters_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "eso_characters_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
