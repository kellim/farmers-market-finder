module.exports = function(grunt) {
  grunt.initConfig({
    cssmin: {
      target: {
        files: {
          'dist/css/styles.min.css': ['src/css/styles.css'],
         }
      }
    },
    uglify: {
      dist: {
        options: {
           sourceMap: true
        },
        files: {
          'dist/js/app.min.js': ['src/js/app.js']
        }
      }
    },
    copy: {
      index: {
        src: 'src/index.html',
        dest: 'dist/index.html',
        options: {
          process: function (content, srcpath) {
            content = content.replace(/app.js/g, 'app.min.js');
            return content.replace(/styles.css/g, 'styles.min.css');
          },
        },
      },
      bg: {
        src: 'src/img/bg.png',
        dest: 'dist/img/bg.png'
      },
      knockout: {
        src: 'src/js/lib/knockout-3.4.0.js',
        dest: 'dist/js/lib/knockout-3.4.0.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['cssmin', 'uglify', 'copy']);
};