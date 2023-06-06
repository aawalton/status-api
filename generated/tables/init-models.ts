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
import { audibleBooks as _audibleBooks } from "./audibleBooks";
import type { audibleBooksAttributes, audibleBooksCreationAttributes } from "./audibleBooks";
import { conquerorChallenges as _conquerorChallenges } from "./conquerorChallenges";
import type { conquerorChallengesAttributes, conquerorChallengesCreationAttributes } from "./conquerorChallenges";
import { esoCharacters as _esoCharacters } from "./esoCharacters";
import type { esoCharactersAttributes, esoCharactersCreationAttributes } from "./esoCharacters";
import { esoCompanionSkills as _esoCompanionSkills } from "./esoCompanionSkills";
import type { esoCompanionSkillsAttributes, esoCompanionSkillsCreationAttributes } from "./esoCompanionSkills";
import { esoCompanions as _esoCompanions } from "./esoCompanions";
import type { esoCompanionsAttributes, esoCompanionsCreationAttributes } from "./esoCompanions";
import { esoSkills as _esoSkills } from "./esoSkills";
import type { esoSkillsAttributes, esoSkillsCreationAttributes } from "./esoSkills";
import { esoZones as _esoZones } from "./esoZones";
import type { esoZonesAttributes, esoZonesCreationAttributes } from "./esoZones";
import { exercises as _exercises } from "./exercises";
import type { exercisesAttributes, exercisesCreationAttributes } from "./exercises";
import { oldAchievements as _oldAchievements } from "./oldAchievements";
import type { oldAchievementsAttributes, oldAchievementsCreationAttributes } from "./oldAchievements";
import { oldAudibleBooks as _oldAudibleBooks } from "./oldAudibleBooks";
import type { oldAudibleBooksAttributes, oldAudibleBooksCreationAttributes } from "./oldAudibleBooks";
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
  _audibleBooks as audibleBooks,
  _conquerorChallenges as conquerorChallenges,
  _esoCharacters as esoCharacters,
  _esoCompanionSkills as esoCompanionSkills,
  _esoCompanions as esoCompanions,
  _esoSkills as esoSkills,
  _esoZones as esoZones,
  _exercises as exercises,
  _oldAchievements as oldAchievements,
  _oldAudibleBooks as oldAudibleBooks,
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
  audibleBooksAttributes,
  audibleBooksCreationAttributes,
  conquerorChallengesAttributes,
  conquerorChallengesCreationAttributes,
  esoCharactersAttributes,
  esoCharactersCreationAttributes,
  esoCompanionSkillsAttributes,
  esoCompanionSkillsCreationAttributes,
  esoCompanionsAttributes,
  esoCompanionsCreationAttributes,
  esoSkillsAttributes,
  esoSkillsCreationAttributes,
  esoZonesAttributes,
  esoZonesCreationAttributes,
  exercisesAttributes,
  exercisesCreationAttributes,
  oldAchievementsAttributes,
  oldAchievementsCreationAttributes,
  oldAudibleBooksAttributes,
  oldAudibleBooksCreationAttributes,
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
  const audibleBooks = _audibleBooks.initModel(sequelize);
  const conquerorChallenges = _conquerorChallenges.initModel(sequelize);
  const esoCharacters = _esoCharacters.initModel(sequelize);
  const esoCompanionSkills = _esoCompanionSkills.initModel(sequelize);
  const esoCompanions = _esoCompanions.initModel(sequelize);
  const esoSkills = _esoSkills.initModel(sequelize);
  const esoZones = _esoZones.initModel(sequelize);
  const exercises = _exercises.initModel(sequelize);
  const oldAchievements = _oldAchievements.initModel(sequelize);
  const oldAudibleBooks = _oldAudibleBooks.initModel(sequelize);
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
    audibleBooks: audibleBooks,
    conquerorChallenges: conquerorChallenges,
    esoCharacters: esoCharacters,
    esoCompanionSkills: esoCompanionSkills,
    esoCompanions: esoCompanions,
    esoSkills: esoSkills,
    esoZones: esoZones,
    exercises: exercises,
    oldAchievements: oldAchievements,
    oldAudibleBooks: oldAudibleBooks,
    profiles: profiles,
    wondriumCategories: wondriumCategories,
    wondriumCourseCategories: wondriumCourseCategories,
    wondriumCourses: wondriumCourses,
  };
}
