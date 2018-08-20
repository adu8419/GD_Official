
rootPath='./dist'

staticPath="${rootPath}/"
#ueditorPath="${rootPath}/manager/"


#cp -f $rootPath/*.js  $staticPath
#cp -f $rootPath/*.css  $staticPath


cp -f -r ./public/* $staticPath

