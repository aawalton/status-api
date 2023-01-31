import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface achievementFormatsAttributes {
  id: string;
  formatName: string;
  isPassive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type achievementFormatsPk = "id";
export type achievementFormatsId = achievementFormats[achievementFormatsPk];
export type achievementFormatsOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type achievementFormatsCreationAttributes = Optional<achievementFormatsAttributes, achievementFormatsOptionalAttributes>;

export class achievementFormats extends Model<achievementFormatsAttributes, achievementFormatsCreationAttributes> implements achievementFormatsAttributes {
  id!: string;
  formatName!: string;
  isPassive!: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof achievementFormats {
    return achievementFormats.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    formatName: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'format_name'
    },
    isPassive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_passive'
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
    tableName: 'achievement_formats',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "achievement_formats_format_name_key",
        unique: true,
        fields: [
          { name: "format_name" },
        ]
      },
      {
        name: "achievement_formats_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
