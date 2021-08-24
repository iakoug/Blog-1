## Cordova

#### 1.项目环境配置、项目构建

http://blog.gxxsite.com/vuejs-cordova-framework-webapp-advance-note/

#### 2.命令执行

添加平台：

```
cordova platform add android@^5.0.0 --save（cordova platform add android --save 默认最新）
```

运行：

```
cordova run android
```

查询平台信息：

```
cordova platform ls
```

查看插件信息：

```
cordova plugin ls
```

#### 3.平台配置

config.xml -包含应用相关信息，使用到的插件以及面向的平台
platforms - 包含应用运行平台如 Android 和 iOS 上对应的 Cordova 库
plugins - 包含应用所需插件的 Cordova 库，使得应用能够访问例如照相机和电池状态相关的事项。
www - 包含应用源代码，例如 HTML, JavaScript 和 CSS 文件
hooks - 包含为个性化应用编译系统所需的脚本来源：
http://www.jcodecraeer.com/a/javascript/2016/0929/6648.html

#### 4.移动端键盘事件处理

html5 如果想给键盘默认进入是数字键、有搜索按钮等。直接

```
input type ='number'
input type = 'search'
```

参考地址：
http://blog.csdn.net/listmana/article/details/53942361

###### 1.注意：移动端是可以监听到 keydown 事件的。建议打印 e.keyCode 和 event 来进行提前判定

###### 2.键盘中,'下一步'按键，keyCode == '9'，为 tab 按键。

###### 3.控制软键盘插件：ionic-plugin-keyboard

```
git链接：https://github.com/driftyco/ionic-plugin-keyboard
```

###### 4.android 手机键盘显示，界面问题:

http://2dxgujun.com/post/2014/10/23/Soft-Keyboard-Jacking-Control.html

#### 6.event.target 和 event.currentTarget 的区别

target：触发事件的元素。
currentTarget：事件绑定的元素。
http://www.cnblogs.com/lanse-yan/archive/2013/12/11/3469634.html

#### 7.web 端扫描枪应用

https://my.oschina.net/cpWeb/blog/775493
首先聚焦，相当于手动输入了值后，按了 endter 键。

#### 8.h5 中 input type ='number'，如果输入非法数字（如：\ff23）,将自动把 Input 中 value 值清空

解决办法：
方法 1：获取焦点时，type = number,失去焦点时，type = text
方法 2：调用原生 js api,判断是非法字符系统清空还是人为清空

```
//如果是非法输入字符，e.currentTarget.validity.badInput == true
if(e.currentTarget.validity.badInput){
	this.limit = false;
}
else{
	this.limit = true;
}
```

#### 9.cordova 项目跑 android，让 app 程序开机自动启动。（封死其他 app，让其只能在该 app 里面运行）

https://my.oschina.net/jgy/blog/135858
原理：在 android 开机时候，系统会收到开机的广播，然后在 app 里面，设置开机启动监听控制，将自己的包丢进去。
修改 MainActivity.java，添加 BootBroadcastReceiver.java（路径 platforms-android-src-vue-cordova-demo）

#### 10.移动端判定是否已达底部，无限加载

判断条件需要理解三个概念：
1.scrollHeight 真实内容的高度
2.clientHeight 视窗的高度，即在浏览器中所能看到的内容的高度
3.scrollTop 视窗上面隐藏掉的部分，即滚动条滚动的距离

#### 11.解决 cordova 开机加载页面的圈圈。。

在 config.xml 里面

```
<platform name = "android">
```

里面添加

```
<preference name="ShowSplashScreenSpinner" value="false"/>
```

#### 12.在使用 cordova.plugins.fileOpener2 插件打开 APK 安装目录时候，注意路径

```
var targetPath = 'cdvfile://localhost/persistent/9xlink-pda.apk';
```

在 config.xml 文件中配置持久化文件保存位置（Persistent storage location）
ios 中，默认配置或如下配置时，会保存在程序的 Documents 文件目录下

```
<preference name="iosPersistentFileLocation" value="Compatibility" />
```

要想保存到应用的 Library 文件夹下，可以如下配置

```
<preference name="iosPersistentFileLocation" value="Library" />
```

Android 中，默认配置或如下配置时，会保存在 /data/data/<packageId> 下面

```
<preference name="AndroidPersistentFileLocation" value="Internal" />
```

要想保存到 SD 卡或等效的存储分区，可以如下配置：

```
<preference name="AndroidPersistentFileLocation" value="Compatibility" />
```

在 config.xml 文件中配置文件系统

```
<preference name="iosExtraFilesystems" value="library,library-nosync,documents,documents-nosync,cache,bundle,root" />
```

```
<preference name="AndroidExtraFilesystems" value="files,files-external,documents,sdcard,cache,cache-external,assets,root" />
```

来源： http://blog.csdn.net/fxp850899969/article/details/56846583
在 AndroidManifest.xml 中如下配置：

```
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

#### 13.在使用 cordova.plugins.fileOpener2 插件打开 APK 后，安装成功。直接退出了安装过程，到了首页。

解决办法:在打开 apk 安装包的时候，退出 APP

```
cordova.plugins.fileOpener2.open(
openUrl,
'application/vnd.android.package-archive',
{
  error:function(e){
  console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
},
success:function(){
  console.log('open successfully');
  navigator.app.exitApp();
}
});
```

#### 14.cordova 常用的插件和命令

常用命令来自：http://www.hangge.com/blog/cache/detail_1158.html
