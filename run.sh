# echo -e '\e[36mgit add .\e[36m'
# git add .
# echo -e '\e[36mgit commit -m "change filename to index"\e[36m'
# git commit -m "change filename to index"
# echo -e '\e[36mgit push -u origin master\e[36m'
# git push -u origin master

if [ "$1" = "" ]
then
    echo 'コメントよこせ'
    echo '( ´ ▽ ` )ﾉ'
else
    echo $1
    echo -e '\e[36mgit add .\e[36m'
    git add .
    echo -e "\e[36mgit commit -m $1\e[36m"
    git commit -m $1
    echo -e '\e[36mgit push -u origin master\e[36m'
    git push -u origin master
fi