import type { Sequelize } from "sequelize";
import { achievementCategories as _achievementCategories } from "./achievementCategories";
import type { achievementCategoriesAttributes, achievementCategoriesCreationAttributes } from "./achievementCategories";
import { achievementCircles as _achievementCircles } from "./achievementCircles";
import type { achievementCirclesAttributes, achievementCirclesCreationAttributes } from "./achievementCircles";
import { achievementColors as _achievementColors } from "./achievementColors";
import type { achievementColorsAttributes, achievementColorsCreationAttributes } from "./achievementColors";
import { achievementFormats as _achievementFormats } from "./achievementFormats";
import type { achievementFormatsAttributes, achievementFormatsCreationAttributes } from "./achievementFormats";
import { achievementPoints as _achievementPoints } from "./achievementPoints";
import type { achievementPointsAttributes, achievementPointsCreationAttributes } from "./achievementPoints";
import { achievementTypes as _achievementTypes } from "./achievementTypes";
import type { achievementTypesAttributes, achievementTypesCreationAttributes } from "./achievementTypes";
import { achievements as _achievements } from "./achievements";
import type { achievementsAttributes, achievementsCreationAttributes } from "./achievements";
import { esoCharacters as _esoCharacters } from "./esoCharacters";
import type { esoCharactersAttributes, esoCharactersCreationAttributes } from "./esoCharacters";
import { esoSkills as _esoSkills } from "./esoSkills";
import type { esoSkillsAttributes, esoSkillsCreationAttributes } from "./esoSkills";
import { esoZones as _esoZones } from "./esoZones";
import type { esoZonesAttributes, esoZonesCreationAttributes } from "./esoZones";
import { exercises as _exercises } from "./exercises";
import type { exercisesAttributes, exercisesCreationAttributes } from "./exercises";
import { profiles as _profiles } from "./profiles";
import type { profilesAttributes, profilesCreationAttributes } from "./profiles";
import { wondriumCategories as _wondriumCategories } from "./wondriumCategories";
import type { wondriumCategoriesAttributes, wondriumCategoriesCreationAttributes } from "./wondriumCategories";
import { wondriumCourseCategories as _wondriumCourseCategories } from "./wondriumCourseCategories";
import type { wondriumCourseCategoriesAttributes, wondriumCourseCategoriesCreationAttributes } from "./wondriumCourseCategories";
import { wondriumCourses as _wondriumCourses } from "./wondriumCourses";
import type { wondriumCoursesAttributes, wondriumCoursesCreationAttributes } from "./wondriumCourses";

export {
  _achievementCategories as achievementCategories,
  _achievementCircles as achievementCircles,
  _achievementColors as achievementColors,
  _achievementFormats as achievementFormats,
  _achievementPoints as achievementPoints,
  _achievementTypes as achievementTypes,
  _achievements as achievements,
  _esoCharacters as esoCharacters,
  _esoSkills as esoSkills,
  _esoZones as esoZones,
  _exercises as exercises,
  _profiles as profiles,
  _wondriumCategories as wondriumCategories,
  _wondriumCourseCategories as wondriumCourseCategories,
  _wondriumCourses as wondriumCourses,
};

export type {
  achievementCategoriesAttributes,
  achievementCategoriesCreationAttributes,
  achievementCirclesAttributes,
  achievementCirclesCreationAttributes,
  achievementColorsAttributes,
  achievementColorsCreationAttributes,
  achievementFormatsAttributes,
  achievementFormatsCreationAttributes,
  achievementPointsAttributes,
  achievementPointsCreationAttributes,
  achievementTypesAttributes,
  achievementTypesCreationAttributes,
  achievementsAttributes,
  achievementsCreationAttributes,
  esoCharactersAttributes,
  esoCharactersCreationAttributes,
  esoSkillsAttributes,
  esoSkillsCreationAttributes,
  esoZonesAttributes,
  esoZonesCreationAttributes,
  exercisesAttributes,
  exercisesCreationAttributes,
  profilesAttributes,
  profilesCreationAttributes,
  wondriumCategoriesAttributes,
  wondriumCategoriesCreationAttributes,
  wondriumCourseCategoriesAttributes,
  wondriumCourseCategoriesCreationAttributes,
  wondriumCoursesAttributes,
  wondriumCoursesCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const achievementCategories = _achievementCategories.initModel(sequelize);
  const achievementCircles = _achievementCircles.initModel(sequelize);
  const achievementColors = _achievementColors.initModel(sequelize);
  const achievementFormats = _achievementFormats.initModel(sequelize);
  const achievementPoints = _achievementPoints.initModel(sequelize);
  const achievementTypes = _achievementTypes.initModel(sequelize);
  const achievements = _achievements.initModel(sequelize);
  const esoCharacters = _esoCharacters.initModel(sequelize);
  const esoSkills = _esoSkills.initModel(sequelize);
  const esoZones = _esoZones.initModel(sequelize);
  const exercises = _exercises.initModel(sequelize);
  const profiles = _profiles.initModel(sequelize);
  const wondriumCategories = _wondriumCategories.initModel(sequelize);
  const wondriumCourseCategories = _wondriumCourseCategories.initModel(sequelize);
  const wondriumCourses = _wondriumCourses.initModel(sequelize);

  achievements.belongsTo(achievementCategories, { foreignKey: "categoryName"});
  achievementCategories.hasMany(achievements, { foreignKey: "categoryName"});
  achievementCategories.belongsTo(achievementColors, { foreignKey: "color"});
  achievementColors.hasMany(achievementCategories, { foreignKey: "color"});
  achievements.belongsTo(achievementPoints, { foreignKey: "points"});
  achievementPoints.hasMany(achievements, { foreignKey: "points"});
  achievements.belongsTo(achievementTypes, { foreignKey: "type"});
  achievementTypes.hasMany(achievements, { foreignKey: "type"});
  achievements.belongsTo(achievements, { foreignKey: "parentAchievementId"});
  achievements.hasMany(achievements, { foreignKey: "parentAchievementId"});

  return {
    achievementCategories: achievementCategories,
    achievementCircles: achievementCircles,
    achievementColors: achievementColors,
    achievementFormats: achievementFormats,
    achievementPoints: achievementPoints,
    achievementTypes: achievementTypes,
    achievements: achievements,
    esoCharacters: esoCharacters,
    esoSkills: esoSkills,
    esoZones: esoZones,
    exercises: exercises,
    profiles: profiles,
    wondriumCategories: wondriumCategories,
    wondriumCourseCategories: wondriumCourseCategories,
    wondriumCourses: wondriumCourses,
  };
}
