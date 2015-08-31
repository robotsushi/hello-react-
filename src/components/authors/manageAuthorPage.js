"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');

var AuthorActions = require('../../Actions/authorActions');
var AuthorStore = require('../../Stores/authorStore');

var Promise = require("bluebird");

var ManageAuthorPage = React.createClass({

	mixins: [

		Router.Navigation

	],

	statics: {
		willTransitionFrom: function(transition, component){

			if(component.state.dirty && !confirm('Leave with saving?')){
				transition.abort();
			}

		}

	},

	getInitialState: function(){

		return {
			author: { firstName: '', lastName: '', id: '', dirty: false }, 
			errors: {}
		};

	},

	componentWillMount: function(){

		var authorId = this.props.params.id; //author:id

		if(authorId) {
			this.setState({author: AuthorStore.getAuthorById(authorId)});
		}

	}, 

	setAuthorState: function(event){

		this.setState({ dirty: true });

		var field = event.target.name;
		var value = event.target.value;
		
		this.state.author[field] = value; 

		return this.setState( { author: this.state.author });

	}, 

	authorFormIsValid: function(){

		var formIsValid = true;
		this.state.errors = {};

		if(this.state.author.firstName.length < 3){
			this.state.errors.firstName = "first name must be at least 3 chars";
			formIsValid = false;
		}

		if(this.state.author.lastName.length < 3){
			this.state.errors.lastName = "last name must be at least 3 chars";
			formIsValid = false;
		}

		this.setState({ errors: this.state.errors });

		return formIsValid;

	},

	saveAuthor: function(event){

		event.preventDefault();

		this.setState({ dirty: false });

		if(!this.authorFormIsValid())
		{			
			return;
		}

		
		AuthorActions.createAuthor(this.state.author);

		var self = this;

		this.setStateAsync({ dirty: false }, this)
			.then(function(){

				self.transitionTo('authors');		

			})
			.catch(function(e){

				console.error(e);

			});

		
	},

	setStateAsync: function(setStateConfig, self){

		return new Promise(function(resolve, reject){

			self.setState(setStateConfig, function(){

				resolve();

			});

		});

	}, 

	render: function(){

		return (			

			<AuthorForm 
			author={ this.state.author }
			onChange={ this.setAuthorState } 
			onSave={ this.saveAuthor }
			errors={ this.state.errors }
			/>

		);

	}

});

module.exports = ManageAuthorPage;