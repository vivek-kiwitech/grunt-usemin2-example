module.exports = function(grunt) {
	// load grunt tasks based on dependencies in package.json
	require('load-grunt-tasks')(grunt);
	// Configurable paths for the application
	var appConfig = {
		dist: "dist"
	};
	grunt.config.init({
		// Project settings
		example: appConfig,
		usemin2: {
				options: {
						// If provided, then set all path in html files relative to this directory
						baseDir: "<%= example.dist %>",
				
						// Task(s) to execute to process the css
						cssmin: 'cssmin',
				
						// Task(s) to execute to process the js
						jsmin: 'uglify'
				},
				
				// This should contain a reference to all HTML files that usemin2
				// needs to process
				html: '<%= example.dist %>/index.html',
				
				// This section contain everything about css files processing
				css: {
						// You can create as much section as you want with
						// any name you want to use
						section_name: {
								// Each section should define a destination that point to the file
								// that will be created if the minification process is executed
								dest: "<%= example.dist %>/assets/css/style.min.css",
				
								// Files that needs to be processed for this section
								files: [{
										// Same as usual
										cwd: "./",
										// List of src (can be an array), each can be expanded,
										// you can also use a special "__min__" markup to select
										// thje correct file depending on the running process
										src: ["assets/css/style.css"]
										// Destination of the files when no minification process
										// occurs
										// dest: "dest/"
								} /* , ... */]
						}/* , ... */
				},
				
				// Same as css but for js files
				js: {
					section_name: {
						// Each section should define a destination that point to the file
						// that will be created if the minification process is executed
						dest: "<%= example.dist %>/assets/js/optimized.js",
		
						// Files that needs to be processed for this section
						files: [{
								// Same as usual
								cwd: "./",
								// List of src (can be an array), each can be expanded,
								// you can also use a special "__min__" markup to select
								// thje correct file depending on the running process
								src: ["assets/js/bar.js", "assets/js/foo.js"],
								// Destination of the files when no minification process
								// occurs
								// dest: ".tmp/concat/assets/js/optimized.js"
						} /* , ... */]
					}/* , ... */
				}
		},
	  copy:{
	    html: {
	    	src: './index.html', dest: '<%= example.dist %>/index.html'
	    }
	  }
	});

	grunt.registerTask('default',[
		'copy:html',
		'usemin2:release',
    ]);
}

