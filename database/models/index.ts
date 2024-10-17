import Course from './Course';
import CourseDetail from './CourseDetail';
import CourseDeliveryFormat from './CourseDeliveryFormat';
import CourseTerm from './CourseTerm';
import UserProfile from './UserProfile';
import User from './User';
import Review from './Review';
import ReviewAnswer from './ReviewAnswer';
import ReviewType from './ReviewType';
import Policy from './Policy';
import Question from './Question';
import ReviewStatus from './ReviewStatus';
import ProfessorCourse from './ProfessorCourse';
import ReviewQuestion from './ReviewQuestion';
import ReviewPolicyViolationLog from './ReviewPolicyViolationLog';

// Ref: https://sequelize.org/docs/v7/category/associations/
const setupAssociations = () => {
  // Course-related associations
  Course.belongsTo(CourseDetail, { foreignKey: 'course_detail_id' });
  Course.belongsTo(CourseTerm, { foreignKey: 'course_term_id' });
  Course.belongsTo(CourseDeliveryFormat, { foreignKey: 'course_delivery_format_id' });
  CourseDetail.hasMany(Course, { foreignKey: 'course_detail_id' });
  CourseTerm.hasMany(Course, { foreignKey: 'course_term_id' });
  CourseDeliveryFormat.hasMany(Course, { foreignKey: 'course_delivery_format_id' });
  UserProfile.belongsTo(User, { foreignKey: 'user_id' });
  User.hasOne(UserProfile, { foreignKey: 'user_id' });
  ReviewType.hasMany(Review, { foreignKey: 'review_type_id' });
  Review.belongsTo(ReviewType, { foreignKey: 'review_type_id' });
  ReviewStatus.hasMany(Review, { foreignKey: 'review_status_id' });
  Review.belongsTo(ReviewStatus, { foreignKey: 'review_status_id' });
  ProfessorCourse.hasMany(Review, { foreignKey: 'professor_course_id' });
  Review.belongsTo(ProfessorCourse, { foreignKey: 'professor_course_id' });
  User.hasMany(Review, { foreignKey: 'user_id' });
  Review.belongsTo(User, { foreignKey: 'user_id' });
  Review.hasMany(ReviewQuestion, { foreignKey: 'review_id' });
  ReviewQuestion.belongsTo(Review, { foreignKey: 'review_id' });
  Question.hasMany(ReviewQuestion, { foreignKey: 'question_id' });
  ReviewQuestion.belongsTo(Question, { foreignKey: 'question_id' });
  ReviewQuestion.hasMany(ReviewAnswer, { foreignKey: 'review_question_id' });
  ReviewAnswer.belongsTo(ReviewQuestion, { foreignKey: 'review_question_id' });
  Review.hasMany(ReviewPolicyViolationLog, { foreignKey: 'review_id' });
  ReviewPolicyViolationLog.belongsTo(Review, { foreignKey: 'review_id' });
  Policy.hasMany(ReviewPolicyViolationLog, { foreignKey: 'policy_id' });
  ReviewPolicyViolationLog.belongsTo(Policy, { foreignKey: 'policy_id' });
};

export { setupAssociations };
