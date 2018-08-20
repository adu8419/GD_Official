
rootPath='./dist'

staticPath="${rootPath}/manager/"
#ueditorPath="${rootPath}/manager/"


# 这里的-d 参数判断$myPath是否存在
if [ ! -d "$rootPath" ]; then
 mkdir $rootPath
fi
if [ ! -d "$staticPath" ]; then
 mkdir $staticPath
fi


cp -f $rootPath/*.js  $staticPath
cp -f $rootPath/*.css  $staticPath


cp -f -r ./public/* $staticPath

