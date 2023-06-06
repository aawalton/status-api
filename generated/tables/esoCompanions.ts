import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface esoCompanionsAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  rank: number;
}

export type esoCompanionsPk = "id";
export type esoCompanionsId = esoCompanions[esoCompanionsPk];
export type esoCompanionsOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type esoCompanionsCreationAttributes = Optional<esoCompanionsAttributes, esoCompanionsOptionalAttributes>;

export class esoCompanions extends Model<esoCompanionsAttributes, esoCompanionsCreationAttributes> implements esoCompanionsAttributes {
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;
  rank!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof esoCompanions {
    return esoCompanions.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "eso_companions_name_key"
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
    tableName: 'eso_companions',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "eso_companions_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "eso_companions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
