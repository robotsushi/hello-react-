"use strict";

var React = require('React');

var About = React.createClass({
	
	statics: {

		willTransitionTo: function(transition, params, query, callback){
			//do auth stuff
			if(!confirm('Are you sure you are ready for this lame ass about page ???')){
				transition.abort();
			} else{
				callback();
			}
		}, 

		willTransitionFrom: function(transition, component){
			//do auth stuff
			if(!confirm('Magnets - How do they even work ?')){
				transition.abort();
			} 
		}

	},

	render: function(){
		
		return (
			
			<div>
				<h1>About</h1>
				<p>
					This application uses the following technologies:
			
					<ul>
						<li>React</li>
						<li>React Router</li>
						<li>Flux</li>
						<li>Node</li>
						<li>Gulp</li>
						<li>Browserify</li>
						<li>Bootstrap</li>
					</ul>
				</p>
				
			</div>

			
		);
		
	}
	
});

module.exports = About;