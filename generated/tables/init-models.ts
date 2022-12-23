import type { Sequelize } from "sequelize";
import { achievementColors as _achievementColors } from "./achievementColors";
import type { achievementColorsAttributes, achievementColorsCreationAttributes } from "./achievementColors";
import { achievementPoints as _achievementPoints } from "./achievementPoints";
import type { achievementPointsAttributes, achievementPointsCreationAttributes } from "./achievementPoints";
import { achievementTypes as _achievementTypes } from "./achievementTypes";
import type { achievementTypesAttributes, achievementTypesCreationAttributes } from "./achievementTypes";
import { achievements as _achievements } from "./achievements";
import type { achievementsAttributes, achievementsCreationAttributes } from "./achievements";
import { categories as _categories } from "./categories";
import type { categoriesAttributes, categoriesCreationAttributes } from "./categories";
import { esoCharacters as _esoCharacters } from "./esoCharacters";
import type { esoCharactersAttributes, esoCharactersCreationAttributes } from "./esoCharacters";
import { esoSkills as _esoSkills } from "./esoSkills";
import type { esoSkillsAttributes, esoSkillsCreationAttributes } from "./esoSkills";
import { esoZones as _esoZones } from "./esoZones";
import type { esoZonesAttributes, esoZonesCreationAttributes } from "./esoZones";
import { profiles as _profiles } from "./profiles";
import type { profilesAttributes, profilesCreationAttributes } from "./profiles";
import { wondriumCategories as _wondriumCategories } from "./wondriumCategories";
import type { wondriumCategoriesAttributes, wondriumCategoriesCreationAttributes } from "./wondriumCategories";
import { wondriumCategoriesOld as _wondriumCategoriesOld } from "./wondriumCategoriesOld";
import type { wondriumCategoriesOldAttributes, wondriumCategoriesOldCreationAttributes } from "./wondriumCategoriesOld";
import { wondriumCourseCategories as _wondriumCourseCategories } from "./wondriumCourseCategories";
import type { wondriumCourseCategoriesAttributes, wondriumCourseCategoriesCreationAttributes } from "./wondriumCourseCategories";
import { wondriumCourseCategoriesOld as _wondriumCourseCategoriesOld } from "./wondriumCourseCategoriesOld";
import type { wondriumCourseCategoriesOldAttributes, wondriumCourseCategoriesOldCreationAttributes } from "./wondriumCourseCategoriesOld";
import { wondriumCourses as _wondriumCourses } from "./wondriumCourses";
import type { wondriumCoursesAttributes, wondriumCoursesCreationAttributes } from "./wondriumCourses";
import { wondriumCoursesOld as _wondriumCoursesOld } from "./wondriumCoursesOld";
import type { wondriumCoursesOldAttributes, wondriumCoursesOldCreationAttributes } from "./wondriumCoursesOld";

export {
  _achievementColors as achievementColors,
  _achievementPoints as achievementPoints,
  _achievementTypes as achievementTypes,
  _achievements as achievements,
  _categories as categories,
  _esoCharacters as esoCharacters,
  _esoSkills as esoSkills,
  _esoZones as esoZones,
  _profiles as profiles,
  _wondriumCategories as wondriumCategories,
  _wondriumCategoriesOld as wondriumCategoriesOld,
  _wondriumCourseCategories as wondriumCourseCategories,
  _wondriumCourseCategoriesOld as wondriumCourseCategoriesOld,
  _wondriumCourses as wondriumCourses,
  _wondriumCoursesOld as wondriumCoursesOld,
};

export type {
  achievementColorsAttributes,
  achievementColorsCreationAttributes,
  achievementPointsAttributes,
  achievementPointsCreationAttributes,
  achievementTypesAttributes,
  achievementTypesCreationAttributes,
  achievementsAttributes,
  achievementsCreationAttributes,
  categoriesAttributes,
  categoriesCreationAttributes,
  esoCharactersAttributes,
  esoCharactersCreationAttributes,
  esoSkillsAttributes,
  esoSkillsCreationAttributes,
  esoZonesAttributes,
  esoZonesCreationAttributes,
  profilesAttributes,
  profilesCreationAttributes,
  wondriumCategoriesAttributes,
  wondriumCategoriesCreationAttributes,
  wondriumCategoriesOldAttributes,
  wondriumCategoriesOldCreationAttributes,
  wondriumCourseCategoriesAttributes,
  wondriumCourseCategoriesCreationAttributes,
  wondriumCourseCategoriesOldAttributes,
  wondriumCourseCategoriesOldCreationAttributes,
  wondriumCoursesAttributes,
  wondriumCoursesCreationAttributes,
  wondriumCoursesOldAttributes,
  wondriumCoursesOldCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const achievementColors = _achievementColors.initModel(sequelize);
  const achievementPoints = _achievementPoints.initModel(sequelize);
  const achievementTypes = _achievementTypes.initModel(sequelize);
  const achievements = _achievements.initModel(sequelize);
  const categories = _categories.initModel(sequelize);
  const esoCharacters = _esoCharacters.initModel(sequelize);
  const esoSkills = _esoSkills.initModel(sequelize);
  const esoZones = _esoZones.initModel(sequelize);
  const profiles = _profiles.initModel(sequelize);
  const wondriumCategories = _wondriumCategories.initModel(sequelize);
  const wondriumCategoriesOld = _wondriumCategoriesOld.initModel(sequelize);
  const wondriumCourseCategories = _wondriumCourseCategories.initModel(sequelize);
  const wondriumCourseCategoriesOld = _wondriumCourseCategoriesOld.initModel(sequelize);
  const wondriumCourses = _wondriumCourses.initModel(sequelize);
  const wondriumCoursesOld = _wondriumCoursesOld.initModel(sequelize);

  categories.belongsTo(achievementColors, { foreignKey: "color"});
  achievementColors.hasMany(categories, { foreignKey: "color"});
  achievements.belongsTo(achievementPoints, { foreignKey: "points"});
  achievementPoints.hasMany(achievements, { foreignKey: "points"});
  achievements.belongsTo(achievementTypes, { foreignKey: "type"});
  achievementTypes.hasMany(achievements, { foreignKey: "type"});
  achievements.belongsTo(achievements, { foreignKey: "parentAchievementId"});
  achievements.hasMany(achievements, { foreignKey: "parentAchievementId"});
  wondriumCategories.belongsTo(achievements, { foreignKey: "achievementId"});
  achievements.hasMany(wondriumCategories, { foreignKey: "achievementId"});
  wondriumCourseCategories.belongsTo(achievements, { foreignKey: "achievementId"});
  achievements.hasMany(wondriumCourseCategories, { foreignKey: "achievementId"});
  achievements.belongsTo(categories, { foreignKey: "categoryName"});
  categories.hasMany(achievements, { foreignKey: "categoryName"});

  return {
    achievementColors: achievementColors,
    achievementPoints: achievementPoints,
    achievementTypes: achievementTypes,
    achievements: achievements,
    categories: categories,
    esoCharacters: esoCharacters,
    esoSkills: esoSkills,
    esoZones: esoZones,
    profiles: profiles,
    wondriumCategories: wondriumCategories,
    wondriumCategoriesOld: wondriumCategoriesOld,
    wondriumCourseCategories: wondriumCourseCategories,
    wondriumCourseCategoriesOld: wondriumCourseCategoriesOld,
    wondriumCourses: wondriumCourses,
    wondriumCoursesOld: wondriumCoursesOld,
  };
}
