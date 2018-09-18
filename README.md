> [grunt-usemin2](https://bitbucket.org/qraynaud/grunt-usemin2/overview) example.


The directory structure looks like:

```sh
.
├── assets
│   ├── css
│   │   └── style.css
│   └── js
│       ├── bar.js
│       └── foo.js
├── gruntfile.js
├── index.html
└── package.json
```

Where `style.css` includes bare minimal CSS and `bar.js` and `foo.js` are simple javascript files.

The `index.html` looks like:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Usemin2 test</title>
    <!-- usemin2:css:section_name -->
    <link rel="stylesheet" type="text/css" href="./assets/css/style.css" media="screen" />

  </head>
  <body>

  </body>
    <!-- usemin2:js:section_name -->
    <script src="./assets/js/foo.js"></script>
    <script src="./assets/js/bar.js"></script>
</html>

```

And the `gruntfile.js` looks like:

```sh
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


```

__On grunting__: 

```sh
$ grunt
Running "copy:html" (copy) task
Copied 1 files

Running "usemin2:release" (usemin2) task

Running "cssmin:usemin2_css_section_name" (cssmin) task
File dist/assets/css/style.min.css created: 48 B → 39 B

Running "concat:usemin2_css_section_name" (concat) task
File "dist/assets/css/style.min.css" created.

Running "uglify:usemin2_js_section_name" (uglify) task
File dist/assets/js/optimized.js created: 74 B → 58 B

Running "concat:usemin2_js_section_name" (concat) task
File "dist/assets/js/optimized.js" created.

Done, without errors.
```

Do notice that `default` task:

```sh
	grunt.registerTask('default',[
		'copy:html',
		'usemin2:release',
    ]);
```

The new dir structure will be:

```sh
.
├── assets
│   ├── css
│   │   └── style.css
│   └── js
│       ├── bar.js
│       └── foo.js
├── dist
│   ├── assets
│   │   ├── css
│   │   │   └── style.min.css
│   │   └── js
│   │       └── optimized.js
│   └── index.html
├── gruntfile.js
├── index.html
```

`css` is minifed and `js` is concated and minifed. Have a look the `dist` and `.tmp` dir that are added for your refference.

Hope this helped you to get started with usemin!



