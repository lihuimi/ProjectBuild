/**
 * 此配置文件本质就是一个node函数模块
 */
module.exports = function (grunt) {

    //1. 初始化插件配置
    grunt.initConfig({
        //主要编码处

        //合并js
        concat: {
            options: {
                separator: ';'   //使用;连接合并
            },
            build: {
                src: ["src/js/*.js"],  //合并哪些js文件
                dest: "build/js/built.js" //合并输出的js文件
            }
        },

        //读取package.json信息
        pkg : grunt.file.readJSON('package.json'),

        //压缩js
        uglify : {
            options : {
                banner : '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            build: {
                files: {
                    'build/js/built-<%=pkg.name%>-<%=pkg.version%>.min.js': ['build/js/built.js']
                }
            }
        },

        //js语法检查
        jshint : {
            options: {
                jshintrc : '.jshintrc'
            },
            build : ['Gruntfile.js', 'src/js/*.js']
        },

        //合并压缩css
        cssmin:{
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            build: {
                files: {
                    'build/css/output.min.css': ['src/css/*.css']
                }
            }
        },

        //压缩html
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/index.html': 'index.html'
                }
            }
        },

        //监视
        watch : {
            scripts : {
                files : ['src/js/*.js', 'src/css/*.css', 'index.html'],
                tasks : ['concat', 'jshint', 'uglify', 'cssmin'],
                options : {spawn : false}
            }
        }

    });

    //2. 加载插件任务
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    //3. 注册构建默认任务
    grunt.registerTask('default',
        ['concat', 'uglify', 'jshint', 'cssmin', 'htmlmin', 'watch']);
};