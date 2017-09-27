/**
 * 判断当前的环境是否符合 前端开发环境
 */
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}
var chalk = require('chalk');  //输出颜色错误或者正确
var semver = require('semver'); //匹配版本信息
var shell = require('shelljs'); //执行shell命令

var packageConfig = require('../package.json');

var begin = false;
var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  }
]
if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports=function(){
	  var warnings = []
	  for (var i = 0; i < versionRequirements.length; i++) {
	    var mod = versionRequirements[i]
	    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
	      warnings.push("请升级 "+ mod.name + ': ' +
	        chalk.red(mod.currentVersion) + ' ,最低版本必须 ' +
	        chalk.green(mod.versionRequirement)
	     );
	    }
	  }

	  if (warnings.length) {
	    for (var i = 0; i < warnings.length; i++) {
	      var warning = warnings[i];
	      console.log('  ' + warning);
	    }
	    process.exit(1);
	  }
	  console.log('  ' +chalk.green("环境加载正常...正在加载gulp任务..."));
}
