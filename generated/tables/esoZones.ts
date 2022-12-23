import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface esoZonesAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type esoZonesPk = "id";
export type esoZonesId = esoZones[esoZonesPk];
export type esoZonesOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type esoZonesCreationAttributes = Optional<esoZonesAttributes, esoZonesOptionalAttributes>;

export class esoZones extends Model<esoZonesAttributes, esoZonesCreationAttributes> implements esoZonesAttributes {
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof esoZones {
    return esoZones.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'eso_zones',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "eso_zones_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "eso_zones_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
