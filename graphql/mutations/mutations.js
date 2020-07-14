const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const QuestionModel = require('../../models/question');
const AnswerModel = require('../../models/answer');
const ChoiceModel = require('../../models/choice');
const schemaType = require('../types/schemaTypes');

const mutations = {
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
        resolve(root, params) {
            const remQuestion = QuestionModel.findByIdAndRemove(params.id).exec();
            if (!remQuestion) {
                throw new Error('Error')
            }
            return remQuestion;
        }
    }
}

module.exports = {
    mutations
}