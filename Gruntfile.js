module.exports = function(grunt) {
  var mozjpeg = require('imagemin-mozjpeg');
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
    },
    critical: {
      main: {
        options: {
          base: './',
          css: [
            'src/css/styles.css'
          ],
          width: 1366,
          height: 768
        },
        src: 'dist/index.html',
        dest: 'dist/index.html'
      }
    }
  });
  grunt.loadNpmTasks('grunt-critical');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['cssmin', 'uglify', 'copy', 'critical']);
};