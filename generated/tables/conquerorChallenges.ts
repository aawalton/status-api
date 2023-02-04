import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface conquerorChallengesAttributes {
  id: string;
  title: string;
  miles: number;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type conquerorChallengesPk = "id";
export type conquerorChallengesId = conquerorChallenges[conquerorChallengesPk];
export type conquerorChallengesOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type conquerorChallengesCreationAttributes = Optional<conquerorChallengesAttributes, conquerorChallengesOptionalAttributes>;

export class conquerorChallenges extends Model<conquerorChallengesAttributes, conquerorChallengesCreationAttributes> implements conquerorChallengesAttributes {
  id!: string;
  title!: string;
  miles!: number;
  url!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof conquerorChallenges {
    return conquerorChallenges.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "conqueror_challenges_title_key"
    },
    miles: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
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
    tableName: 'conqueror_challenges',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "conqueror_challenges_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "conqueror_challenges_title_key",
        unique: true,
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
  }
}
