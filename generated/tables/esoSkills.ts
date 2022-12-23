import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface esoSkillsAttributes {
  id: string;
  skillLine: string;
  level: number;
  target: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type esoSkillsPk = "id";
export type esoSkillsId = esoSkills[esoSkillsPk];
export type esoSkillsOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type esoSkillsCreationAttributes = Optional<esoSkillsAttributes, esoSkillsOptionalAttributes>;

export class esoSkills extends Model<esoSkillsAttributes, esoSkillsCreationAttributes> implements esoSkillsAttributes {
  id!: string;
  skillLine!: string;
  level!: number;
  target!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof esoSkills {
    return esoSkills.init({
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
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    }
  }, {
    sequelize,
    tableName: 'eso_skills',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "eso_skills_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "eso_skills_skill_line_level_idx",
        unique: true,
        fields: [
          { name: "skill_line" },
          { name: "level" },
        ]
      },
    ]
  });
  }
}
