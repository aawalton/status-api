import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface achievementCirclesAttributes {
  id: string;
  circleName: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type achievementCirclesPk = "id";
export type achievementCirclesId = achievementCircles[achievementCirclesPk];
export type achievementCirclesOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type achievementCirclesCreationAttributes = Optional<achievementCirclesAttributes, achievementCirclesOptionalAttributes>;

export class achievementCircles extends Model<achievementCirclesAttributes, achievementCirclesCreationAttributes> implements achievementCirclesAttributes {
  id!: string;
  circleName!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof achievementCircles {
    return achievementCircles.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    circleName: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'circle_name'
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
    tableName: 'achievement_circles',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "achievement_circles_circle_name_key",
        unique: true,
        fields: [
          { name: "circle_name" },
        ]
      },
      {
        name: "achievement_circles_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
