# uniapp2wxpack   
修改供webpack插件调用
```js
 const uniapp2wxpack = require('@nibilin33/uniapp2wxpack/dist/lib/index');
     uniapp2wxpack.app('production',{
          subPackagePath: '',
          // uni项目的App.vue中初始设置的处理方式，默认是relegation(降级模式)，[top(顶级模式) / none(丢弃)]
          appMode: 'relegation',
          // 如果原生小程序目录中的目录名称合uni项目输出的目录名相同，是否融合处理，默认不融合处理，直接忽略原生小程序里的目录，merge以uni项目优先
          mergePack: false,
          mainWeixinMpPath: 'mainWeixinMpPath',
          wxResourcePath: '',
          // 原生资源目录路径别名, null代表使用默认值，默认值为 @wxResource (所有类型小程序通用)
          wxResourceAlias: null,
          // 引用原生资源的js的特殊API名称设定, null代表使用默认值，默认值为 __uniRequireWx (所有类型小程序通用)
          uniRequireApiName: null,
          // 引用原生资源的样式文件的特殊API名称设定, null代表使用默认值，默认值为 __uniWxss (所有类型小程序通用)
          uniImportWxssApiName: null,
          // uni项目中的原生资源在pages.json中的特殊属性名称，null代表使用默认值，默认值为 wxResource (所有类型小程序通用)
          configWxResourceKey: null,
          plugins: [
            // 条件编译插件应该在混写插件之前使用
            'jsPreProcessPlugin', // js条件编译
            'cssPreProcessPlugin', // css条件编译
            'htmlPreProcessPlugin', // html条件编译
            'setLibrary',
        ]
});

```