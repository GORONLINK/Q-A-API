var GraphQLList = require('graphql').GraphQLList;
var GraphQLString = require('graphql').GraphQLString;
var QuestionModel = require('../../models/question');
const schemaType = require('../types/schemaTypes');

const questionQuery = {
    questions: {
        type: new GraphQLList(schemaType.questionType),
        resolve: () => {
          const questions = QuestionModel.find().exec()
          if (!questions) {
            throw new Error('Error')
          }
          return questions
        }
    },
    question: {
        type: schemaType.questionType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: (root, params) => {
          const questionDetails = QuestionModel.findById(params.id).exec()
          if (!questionDetails) {
            throw new Error('Error')
          }
          return questionDetails
        }
    }
};

const questionById = {
    };

module.exports = {
    questionQuery
}