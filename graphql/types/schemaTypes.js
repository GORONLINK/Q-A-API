const GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLString = require('graphql').GraphQLString;
const GraphQLBoolean = require('graphql').GraphQLBoolean;
var GraphQLDate = require('graphql-date');

const questionType = new GraphQLObjectType({
    name: 'Question',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        content: {
          type: GraphQLString
        },
        updated_date: {
          type: GraphQLDate
        }
      }
    }
});

const answerType = new GraphQLObjectType({
  name: 'Answer',
  fields: function () {
    return {
      _id: {
        type: GraphQLString
      },
      question: {
          type: GraphQLString
      },
      content: {
        type: GraphQLString
      },        
      updated_date: {
        type: GraphQLDate
      }
    }
  }
});

const choiceType = new GraphQLObjectType({
  name: 'Choice',
  fields: function () {
    return {
      _id: {
        type: GraphQLString
      },
      content: {
        type: GraphQLString
      },
      question: {
        type: GraphQLString
      },
      answer: {
          type: GraphQLString
      },
      ok: {
          type: GraphQLBoolean
      },
      updated_date: {
        type: GraphQLDate
      }
    }
  }
});

module.exports = {
  questionType,
  answerType,
  choiceType
}