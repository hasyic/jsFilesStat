### 运行
ProjectPath=/tom/workspace/proj1 SubFolder=shimo/src node index.js

### 结果
> 得到/tom/workspace/proj/shimo/src下的js文件列表和行数：

```js
Drawing/DrawingDocument.js(7858)
Drawing/Graphics.js(2835)
Drawing/GraphicsEvents.js(98)
Drawing/HtmlPage.js(3878)
Drawing/Rulers.js(3678)
Drawing/ShapeDrawer.js(1741)
Drawing/documentrenderer.js(3530)
Drawing/mobileTouchManager.js(821)
...
```

### Options
#### ProjectPath
项目的绝对地址，必须参数，可以~开头
#### SubFolder
子目录的路径，默认为空
#### IgnoreFolders
忽略的文件夹，以','分隔，缺省值为node_modules和dist
