"use strict";

var Dispatcher = require('../Dispatcher/appDispatcher');
var ActionTypes = require('../constants/ActionTypes');
var EventEmitter = require('events').EventEmitter;

var assign = require('object-assign');

var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _authors = [];

var AuthorStore = assign({}, EventEmitter.prototype, {

	addChangeListen: function(callback){
		this.on(CHANGE_EVENT, callback);
	}, 

	removeChangeListen: function(callback){
		this.removeListener(CHANGE_EVENT, callback);
	}, 

	emitChange: function(){
		this.emit(CHANGE_EVENT);
	}, 


	getAllAuthors: function(){
		return _authors;
	}, 

	getAuthorById: function(id){
		return _.find(_authors, { id: id });
	}

});

Dispatcher.register(function(action){

	switch(action.actionType){

		case ActionTypes.INITIALIZE:
			_authors = action.initialData.authors;
			AuthorStore.emitChange();
			break;

		case ActionTypes.CREATE_AUTHOR: 
			_authors.push(action.author);
			AuthorStore.emitChange();
			break;
		
		default: 
			break;


	}

});

module.exports = AuthorStore;