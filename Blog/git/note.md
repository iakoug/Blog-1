## git

### 配置

#### 1.淘宝镜像

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install [name]
```

安装完成后，在开始菜单里找到“Git”->“Git Bash”，蹦出一个类似命令行窗口的东西，就说明 Git 安装成功！

---

#### 2.创建用户名个邮箱

```bash
# 设置用户名和邮箱
git config --global user.name "Your Name"
git config --global user.email "email@example.com"

# 查看当前用户名和邮箱
git config user.name
git config user.email

```

---

#### 3.创建版本库 repository

```
git init
```

---

### 常用命令

#### 1.基本操作

```
git add demo.txt  保存修改文件到暂存区
git commit -m '提交说明'
git status  查看仓库的状态
git diff  查看修改内容
alt + f8  清除窗口
git log  查看历史记录 git log --pretty=oneline整理的
cat filename  查看文件内容

```

#### 2.版本回退

```
git log  查看当前版本库及其之前的所有commit
git reflog  查看从本地仓库创建之日起，本地所进行的与项目更改有关的操作！比如说commit，clone等操作。
git reset --hard id  回滚到某个commid版本下
git reset --hard Head^  回滚到上一个版本
```

#### 3.本地分支

```
git branch  查看分支，当前分支前面会标一个*号
git branch -a 查看所有分支，包括本地和远程的
git checkout -b branchName  创建并切换到新分支
git checkout branchName  切换分支
git branch -d branchName  删除某本地分支
git branch -D branchName  强制删除某本地分支
git merge branchName  合并某分支到当前分支
```

#### 4.远程分支

##### 4.1 基本操作：

```
git remote -v  查看远程库的信息
git pull origin master  拉取代码到本地
git push origin master  提交修改到远程库
```

##### 4.2 创建远程分支：

```
git branch -a (查看有几个分支)
git checkout -b 'aa'    创建并切换分支
git branch(查看当前正在哪个分支)
git push origin aa(将代码提交到该分支上)
git add .
git commit -m '创建分支'
git pull origin name(拉去分支最新信息)
git push origin name(提交分支信息)
git checkout master(切回主分支)
```

##### 4.3 删除远程分支

```
git push origin --delete <branchName>
```

##### 4.4 重新命名远程分支

```
git push origin --delete originBranch

git branch -m oldName newName

git push origin newName
```

#### 5.远程分支的合并

##### eg:将远程的 chy 分支合并到 ly 分支

##### 5.1 获取并检出此合并请求的分支

```
git fetch origin
git checkout -b chy origin/chy
```

##### 5.2 本地审查变更

##### 5.3 合并分支并修复出现的任何冲突

```
git fetch origin
git checkout -b chy origin/chy
```

##### 5.4 推送合并的结果到 GitLab

```
git fetch origin
git checkout -b chy origin/chy
```

##### 5.5 合并本地分支

```
合并分支时添加注释信息（只适用于non-fast-forward方式， 该方式会生成新的commit。 fast-forward不会生成新的commit ）

--no-ff -m" 本次合并添加的注释信息"

--no-ff ：非快速合并 non-fast-forward
```

##### 5.6 远程分支合并

eg:合并 child 分支到 parent 分支

```
git fetch origin
git checkout -b child origin/child
```

```
本地检查代码，处理冲突
```

```
git checkout parent
git merge --no-ff child
```

```
git push origin parent
```

#### 6.bug 分支

##### 6.1 功能未开发完，不能提交代码

首先，不要 git add,commit。直接隐藏当前的修改

```
git stash
```

2.修改完成后，查看隐藏的列表

```
git stash list
```

3.如果需要恢复到之前的修改

```
git stash pop
```

##### 6.2 功能开发完成，需要提交自己代码

1.先将自己的代码提交到远程

```
git add .
git commit -m 'xx'
git pull
git push
```

2.根据标签，切换到某个 commit 下

```
git reset --hard <id>
```

3.修复 bug....

4.提交修复结果

```
git add .
git commit -m 'xx'
git pull (这里一定要拉最新的代码)
git push
```

参考链接：
[http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137602359178794d966923e5c4134bc8bf98dfb03aea3000](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137602359178794d966923e5c4134bc8bf98dfb03aea3000)

#### 7.标签管理

##### 7.1 基本操作

```
git tag v1.0  默认标签是打在最新提交的commit上的
git tag v0.9 6224937  在指定commit下打标签
git show v0.9  查看标签信息
git push origin tag <tagName>  提交标签到远程
git push origin --delete <tag tagName>  删除远程tag
```

参考链接：
[https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001376951758572072ce1dc172b4178b910d31bc7521ee4000](http://https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001376951758572072ce1dc172b4178b910d31bc7521ee4000)

##### 7.2 修改远程 tag（非特殊情况，不要修改）

将名为 old 的 tag 改为 new，可以通过执行以下命令来修改远程 tag 名称:

```
git tag new old

git tag -d old

git push origin :refs/tags/old

git push --tags
```

#### 8. 历史操作

##### 8.1 删除某次历史提交

回滚到某次提交

```
git revert "commit id"

git push origin master -f

```

##### 8.2 修改历史某次提交

```
git add .
git commit --amend
git rebase --continue
```

#### 9. 分支重命名

本地分支

```
git branch -m oldName newName
```

远程分支

```
// 先重命名本地分支
git branch -m oldName newName

// 删除远程分支
git push --delete origin oldName

// 上传新命名的本地分支
git push origin newName

// 把修改后的本地分支与远程分支关联
git branch --set-upstream-to origin/newName
```

#### 10. 将repo-A仓库的branch-B分支合并到repo-A仓库的branch-B分支
```shell
# 1.克隆A仓库
git clone git@github.com:xxxx/repo-A.git

# 2.添加B仓库为远程分支，设置别名other
git remote add other git@github.com:xxxx/repo-B.git

# 3.拉取B仓库最新信息到本地
git fetch other

# 4.以B仓库拉取的master分支作为基准，本地创建一个feature/merge的新分支
git checkout -b feature/merge other/master

# 5.切换回repo-A仓库的master分支
git checkout master

# 6.将feature/merge分支合并到repo-A仓库的master分支
git merge feature/merge --allow-unrelated-histories

```

#### 11. 将A分支的某些commit合并到B分支
当我们维护定制化项目时，经常会出现这种情况。项目启动，你从主分支master切了一个projectA分支出来，进行定制化开发。但开发中，你发现一个主分支切出来的代码有bug。于是给主分支开发人员提了issue并得到了解决。但这时候问题来了，当你在定制化开发的同时，主分支也在不断的更新代码。导致如果你现在直接合并master代码，会有许多无用的变更。这时候你仅希望将“处理bug对应的commit”合并到自己的分支上。。。这里便需要使用到`cherry-pick`，操作如下：
```shell
 # 切到A分支上
git checkout branchA
# 查看提交记录
git log
# 比如这里我们希望合并记录中的commit_id为 e72jfhfji 的提交
git checkout branchB
# 使用cherry-pick合并A分支的指定commit到branchB的本地分支
git cherry-pick e72jfhfji
# 提交变更
git push origin branchB
```
