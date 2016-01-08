module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'nested',
          trace: false
        },
        files: [{
          expand: true,
          cwd: 'assets/sass',
          src: ['*.scss', '*.sass'],
          dest: 'assets/css',
          ext: '.css'
        }]
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'assets/js/*.js',
        '!assets/js/*.min.js'
      ]
    },

    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['once']
      },
      stylesheets: {
        files: ['assets/sass/*.sass', 'assets/sass/*.scss'],
        tasks: ['css'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('css', ['sass']);
  grunt.registerTask('once', ['sass', 'test']);
  grunt.registerTask('watcher', ['sass', 'watch:stylesheets']);
  grunt.registerTask('default', ['sass', 'test', 'watch']);

};