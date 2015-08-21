module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        webfont: {
            icons: {
                src: 'Desafio/Content/scss/typos/icons/svg/*.svg',
                dest: 'Desafio/Content/css/fonts/',
                destCss: 'Desafio/Content/scss/typos/icons',
                options: {
                    font: 'icons',
                    stylesheet: 'scss',
                    hashes: false,
                    relativeFontPath: '../css/fonts',
                    template: 'Desafio/Content/scss/typos/icons/templates/icon.css',
                    templateOptions: {
                        baseClass: 'icon',
                        classPrefix: 'icon-',
                        mixinPrefix: 'icon-mixin-'

                    }
                }
            }
        },
        sass: {
            // options: {
            // includePaths: ['bower_components/foundation/scss']
            // },
            dist: {
                options: {
                    outputStyle: 'compressed',
					sourcemap: 'none',
                },
                files: {
                    'Desafio/Content/css/site.css': 'Desafio/Content/scss/site.scss'
                }
            }
        },

        watch: {
            grunt: {
                options: {
                    reload: true
                },
                files: ['Gruntfile.js']
            },
            icons: {
                files: 'Desafio/Content/scss/typos/icons/svg/*.svg',
                tasks: ['webfont:icons']
            },
            sass: {
                files: 'Desafio/Content/scss/**/*.scss',
                tasks: ['sass']
            }

        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-webfont');

    grunt.registerTask('build', ['sass']);
    grunt.registerTask('default', ['build', 'watch']);
}
