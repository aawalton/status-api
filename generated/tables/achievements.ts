import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { achievementPoints, achievementPointsId } from './achievementPoints';
import type { achievementTypes, achievementTypesId } from './achievementTypes';
import type { categories, categoriesId } from './categories';

export interface achievementsAttributes {
  id: string;
  userId: string;
  type: string;
  isCollection?: boolean;
  parentAchievementId?: string;
  level?: number;
  categoryName: string;
  title?: string;
  description?: string;
  link?: string;
  points: number;
  target: number;
  progress: number;
  progressAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  completed?: boolean;
  percentComplete?: number;
  importedAt?: Date;
  context?: string;
}

export type achievementsPk = "id";
export type achievementsId = achievements[achievementsPk];
export type achievementsOptionalAttributes = "id" | "type" | "isCollection" | "parentAchievementId" | "level" | "title" | "description" | "link" | "points" | "target" | "progress" | "progressAt" | "completedAt" | "createdAt" | "updatedAt" | "deletedAt" | "completed" | "percentComplete" | "importedAt" | "context";
export type achievementsCreationAttributes = Optional<achievementsAttributes, achievementsOptionalAttributes>;

export class achievements extends Model<achievementsAttributes, achievementsCreationAttributes> implements achievementsAttributes {
  id!: string;
  userId!: string;
  type!: string;
  isCollection?: boolean;
  parentAchievementId?: string;
  level?: number;
  categoryName!: string;
  title?: string;
  description?: string;
  link?: string;
  points!: number;
  target!: number;
  progress!: number;
  progressAt?: Date;
  completedAt?: Date;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;
  completed?: boolean;
  percentComplete?: number;
  importedAt?: Date;
  context?: string;

  // achievements belongsTo achievementPoints via points
  pointsAchievementPoint!: achievementPoints;
  getPointsAchievementPoint!: Sequelize.BelongsToGetAssociationMixin<achievementPoints>;
  setPointsAchievementPoint!: Sequelize.BelongsToSetAssociationMixin<achievementPoints, achievementPointsId>;
  createPointsAchievementPoint!: Sequelize.BelongsToCreateAssociationMixin<achievementPoints>;
  // achievements belongsTo achievementTypes via type
  typeAchievementType!: achievementTypes;
  getTypeAchievementType!: Sequelize.BelongsToGetAssociationMixin<achievementTypes>;
  setTypeAchievementType!: Sequelize.BelongsToSetAssociationMixin<achievementTypes, achievementTypesId>;
  createTypeAchievementType!: Sequelize.BelongsToCreateAssociationMixin<achievementTypes>;
  // achievements belongsTo achievements via parentAchievementId
  parentAchievement!: achievements;
  getParentAchievement!: Sequelize.BelongsToGetAssociationMixin<achievements>;
  setParentAchievement!: Sequelize.BelongsToSetAssociationMixin<achievements, achievementsId>;
  createParentAchievement!: Sequelize.BelongsToCreateAssociationMixin<achievements>;
  // achievements belongsTo categories via categoryName
  categoryNameCategory!: categories;
  getCategoryNameCategory!: Sequelize.BelongsToGetAssociationMixin<categories>;
  setCategoryNameCategory!: Sequelize.BelongsToSetAssociationMixin<categories, categoriesId>;
  createCategoryNameCategory!: Sequelize.BelongsToCreateAssociationMixin<categories>;

  static initModel(sequelize: Sequelize.Sequelize): typeof achievements {
    return achievements.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id'
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "boolean",
      references: {
        model: 'achievement_types',
        key: 'name'
      }
    },
    isCollection: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_collection'
    },
    parentAchievementId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'achievements',
        key: 'id'
      },
      field: 'parent_achievement_id'
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    categoryName: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'name'
      },
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
      allowNull: false,
      defaultValue: 10,
      references: {
        model: 'achievement_points',
        key: 'points'
      }
    },
    target: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    progress: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
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
    }
  }, {
    sequelize,
    tableName: 'achievements',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: "achievements_parent_achievement_id_title_idx",
        unique: true,
        fields: [
          { name: "parent_achievement_id" },
          { name: "title" },
        ]
      },
      {
        name: "achievements_pkey1",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
