import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface oldAchievementsAttributes {
  id?: string;
  userId?: string;
  type?: string;
  isCollection?: boolean;
  parentAchievementId?: string;
  level?: number;
  categoryName?: string;
  title?: string;
  description?: string;
  link?: string;
  points?: number;
  target?: number;
  progress?: number;
  progressAt?: Date;
  completedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  completed?: boolean;
  percentComplete?: number;
  importedAt?: Date;
  context?: string;
  formatName?: string;
  circleName?: string;
}

export type oldAchievementsPk = "id";
export type oldAchievementsId = oldAchievements[oldAchievementsPk];
export type oldAchievementsOptionalAttributes = "id" | "userId" | "type" | "isCollection" | "parentAchievementId" | "level" | "categoryName" | "title" | "description" | "link" | "points" | "target" | "progress" | "progressAt" | "completedAt" | "createdAt" | "updatedAt" | "deletedAt" | "completed" | "percentComplete" | "importedAt" | "context" | "formatName" | "circleName";
export type oldAchievementsCreationAttributes = Optional<oldAchievementsAttributes, oldAchievementsOptionalAttributes>;

export class oldAchievements extends Model<oldAchievementsAttributes, oldAchievementsCreationAttributes> implements oldAchievementsAttributes {
  id?: string;
  userId?: string;
  type?: string;
  isCollection?: boolean;
  parentAchievementId?: string;
  level?: number;
  categoryName?: string;
  title?: string;
  description?: string;
  link?: string;
  points?: number;
  target?: number;
  progress?: number;
  progressAt?: Date;
  completedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  completed?: boolean;
  percentComplete?: number;
  importedAt?: Date;
  context?: string;
  formatName?: string;
  circleName?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof oldAchievements {
    return oldAchievements.init({
    id: {
      type: DataTypes.UUID,
      allowNull: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'user_id'
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isCollection: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_collection'
    },
    parentAchievementId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'parent_achievement_id'
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    categoryName: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'category_name'
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    target: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    progress: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    progressAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'progress_at'
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'completed_at'
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
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    percentComplete: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'percent_complete'
    },
    importedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'imported_at'
    },
    context: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    formatName: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'format_name'
    },
    circleName: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'circle_name'
    }
  }, {
    sequelize,
    tableName: 'old_achievements',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    underscored: true
  });
  }
}
