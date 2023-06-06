import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface esoCompanionSkillsAttributes {
  id: string;
  skillLine: string;
  target: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  rank: number;
}

export type esoCompanionSkillsPk = "id";
export type esoCompanionSkillsId = esoCompanionSkills[esoCompanionSkillsPk];
export type esoCompanionSkillsOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type esoCompanionSkillsCreationAttributes = Optional<esoCompanionSkillsAttributes, esoCompanionSkillsOptionalAttributes>;

export class esoCompanionSkills extends Model<esoCompanionSkillsAttributes, esoCompanionSkillsCreationAttributes> implements esoCompanionSkillsAttributes {
  id!: string;
  skillLine!: string;
  target!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;
  rank!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof esoCompanionSkills {
    return esoCompanionSkills.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    skillLine: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'skill_line'
    },
    target: {
      type: DataTypes.INTEGER,
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
    tableName: 'eso_companion_skills',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "eso_companion_skills_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
