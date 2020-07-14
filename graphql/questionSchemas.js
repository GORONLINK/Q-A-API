const GraphQLSchema = require('graphql').GraphQLSchema;
const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLList = require('graphql').GraphQLList;
const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLBoolean = require('graphql').GraphQLBoolean;
const GraphQLDate = require('graphql-date');
const QuestionModel = require('../models/question');
const AnswerModel = require('../models/answer');
const ChoiceModel = require('../models/choice');
const { GraphQLScalarType } = require('graphql');
const schemaType = require('./types/schemaTypes');

let queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => {
      return {
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
        },
        answers: {
          type: new GraphQLList(schemaType.answerType),
          resolve: () => {
            const answers = AnswerModel.find().exec();
            if(!answers) {
              throw new Error("Error")
            }
            return answers;
          }
        },
        answer: {
          type: schemaType.answerType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: (root, params) => {
            const answerDetails = AnswerModel.findById(params.id).exec();
            if(!answerDetails) {
              throw new Error("Error");
            }
            return answerDetails;
          }
        },
        choices: {
          type: new GraphQLList(schemaType.choiceType),
          resolve: () => {
            const choices = ChoiceModel.find().exec();
            if(!choices) {
              throw new Error("Error");
            }
            return choices;
          }
        },
        choice: {
          type: schemaType.choiceType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: (root, params) => {
            const choiceDetails = ChoiceModel.findById(params.id).exec();
            if(!choiceDetails) {
              throw new Error("Error");
            }
            return choiceDetails;
          }
        }
      }
    }
});

module.exports = new GraphQLSchema({query: queryType});

let mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => {
      return {
        addQuestions: {
          type: schemaType.questionType,
          args: {
            content: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: (root, params) => {
            const questionModel = new QuestionModel(params);
            const newQuestion = questionModel.save();
            if (!newQuestion) {
              throw new Error('Error');
            }
            return newQuestion
          }
        },
        addAnswer: {
          type: schemaType.answerType,
          args: {
              question: {
                type: new GraphQLNonNull(GraphQLString)
              },
              content: {
                  type: new GraphQLNonNull(GraphQLString)
              }
          },
          resolve: (root, params) => {
              const answerModel = new AnswerModel(params);
              const newAnswer = answerModel.save();
              if(!newAnswer) {
                  throw new Error('Error');
              }
              return newAnswer;
          }
        },
        addChoice: {
          type: schemaType.choiceType,
          args: {
            content: {
              type: new GraphQLNonNull(GraphQLString)
            },
            question: {
              type: new GraphQLNonNull(GraphQLString)
            },
            answer: {
              type: new GraphQLNonNull(GraphQLString)
            },
            ok: {
              type: new GraphQLNonNull(GraphQLBoolean)
            }
          },
          resolve: (root, params) => {
            const choiceModel = new ChoiceModel(params);
            const newChoice = choiceModel.save();
            if(!newChoice) {
              throw new Error('Error');
            }
            return newChoice;
          }
        },
        removeQuestion: {
          type: schemaType.questionType,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: (root, params) => {
            const remQuestion = QuestionModel.findByIdAndRemove(params.id).exec();
            if (!remQuestion) {
              throw new Error('Error')
            }
            return remQuestion;
          }
        },
        removeChoice: {
          type: schemaType.choiceType,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: (root, params) => {
            const remChoice = ChoiceModel.findByIdAndRemove(params.id).exec();
            if(!remChoice) {
              throw new Error('Error')
            }
            return remChoice;
          }
        }
      }
    }
});

module.exports = new GraphQLSchema({query: queryType, mutation: mutation});