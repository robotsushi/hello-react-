"use strict";

var Dispatcher = require('../Dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('./actionTypes');

var AuthorActions = {

	createAuthor: function(author){

		var newAuthor = AuthorApi.saveAuthor(author); 

		Dispatcher.dispatch({

			actionType: ActionTypes.CREATE_AUTHOR, 
			author: newAuthor

		});

	}

};

module.exports = AuthorActions;
