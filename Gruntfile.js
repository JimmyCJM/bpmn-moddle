'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: {
      sources: 'lib',
      tests: 'test',
      dist: 'dist'
    },

    eslint: {
      check: {
        src: [
          '{lib,test}/**/*.js'
        ]
      },
      fix: {
        src: [
          '{lib,test}/**/*.js'
        ],
        options: {
          fix: true
        }
      }
    },

    release: {
      options: {
        tagName: 'v<%= version %>',
        commitMessage: 'chore(project): release v<%= version %>',
        tagMessage: 'chore(project): tag v<%= version %>'
      }
    }
  });

  // tasks

  grunt.registerTask('lint', [ 'eslint:check' ]);

  grunt.registerTask('default', [ 'lint', 'test' ]);
};