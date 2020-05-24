(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.MlChartCircle = {}));
}(this, (function (exports) { 'use strict';

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script = {
        name: 'ml-chart-circle',
        props: {
            value: {
                type: Number,
                default: 30
            },
            perc: {
                type: Number,
                default: 42
            },
            text: {
                type: String,
                default: 'Testing chart'
            },
            size: {
                type: Number,
                default: 150
            },
            color: {
                type: String,
                default: '#1aff1a'
            }
        },
        data: function data() {
            return {}
        },
        computed: {
           
            
            baseStyle: function() {
                var styleB = {
                    height: ((this.size) + "px"),
                    width: ((this.size) + "px"),
                };

                return styleB
            },

            borderStyle: function(){
                var border = {
                   
                    height: ((this.size*1.05) + "px"),
                    width: ((this.size*1.05) + "px"),
                    
                };

                return border
            },

            baseHold: function(){
                var hold = {
                    position: 'absolute',
                    height: ((this.size) + "px"),
                    width: ((this.size) + "px"),
                    clip: ("rect(0px, " + (this.size) + "px, " + (this.size) + "px, " + (this.size/2) + "px)")
                };

                return hold
            },
            baseHold2: function(){
                var hold = {
                    position: 'absolute',
                    height: ((this.size) + "px"),
                    width: ((this.size) + "px"),
                    clip: ("rect(0px, " + (this.size) + "px, " + (this.size) + "px, " + ((this.size/2)-1) + "px)")
                };

                return hold
            },

            basePie1: function(){
                var rectRight = Math.ceil(this.size/2);
                // 50 -> 180
                // 30 -> x
                // 50x = 30*180 :: x = (30*180) / 50 :: x = (perc*180) / 50
                var degrees = 180;
                if (this.perc < 50) {
                    degrees = Math.ceil((this.perc*180) / 50);
                }
                var pie = {
                    transition: 'all 1s',
                    position: 'absolute',
                    height: ((this.size) + "px"),
                    width: ((this.size) + "px"),
                    backgroundColor: this.color,
                    transform: ("rotate(" + degrees + "deg)"),
                    clip: ("rect(0px, " + rectRight + "px, " + (this.size) + "px, 0px)"),
                };

                return pie
            },

            basePie2: function(){
                var rectRight = Math.ceil(this.size/2) + 10;
                // 50 -> 180
                // 30 -> x
                // 50x = 30*180 :: x = (30*180) / 50 :: x = (perc*180) / 50
                var degrees = 0;
                if (this.perc > 50) {
                    if (this.perc <= 100) {
                        
                        degrees = Math.ceil(((this.perc-50)*180) / 50);
                        this.perc >= 97 ? degrees -= 4 : null;

                    } else {
                        degrees = 180;
                    }
                    
                }
                var pie = {
                    transition: 'all 1s',
                    position: 'absolute',
                    height: ((this.size) + "px"),
                    width: ((this.size) + "px"),
                    backgroundColor: this.color,
                    transform: ("rotate(" + degrees + "deg)"),
                    clip: ("rect(0px, " + rectRight + "px, " + (this.size) + "px, 0px)"),
                    
                };

                return pie
            },

            

        }

    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
        if (typeof shadowMode !== 'boolean') {
            createInjectorSSR = createInjector;
            createInjector = shadowMode;
            shadowMode = false;
        }
        // Vue.extend constructor export interop.
        var options = typeof script === 'function' ? script.options : script;
        // render functions
        if (template && template.render) {
            options.render = template.render;
            options.staticRenderFns = template.staticRenderFns;
            options._compiled = true;
            // functional template
            if (isFunctionalTemplate) {
                options.functional = true;
            }
        }
        // scopedId
        if (scopeId) {
            options._scopeId = scopeId;
        }
        var hook;
        if (moduleIdentifier) {
            // server build
            hook = function (context) {
                // 2.3 injection
                context =
                    context || // cached call
                        (this.$vnode && this.$vnode.ssrContext) || // stateful
                        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
                // 2.2 with runInNewContext: true
                if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                    context = __VUE_SSR_CONTEXT__;
                }
                // inject component styles
                if (style) {
                    style.call(this, createInjectorSSR(context));
                }
                // register component module identifier for async chunk inference
                if (context && context._registeredComponents) {
                    context._registeredComponents.add(moduleIdentifier);
                }
            };
            // used by ssr in case component is cached and beforeCreate
            // never gets called
            options._ssrRegister = hook;
        }
        else if (style) {
            hook = shadowMode
                ? function (context) {
                    style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
                }
                : function (context) {
                    style.call(this, createInjector(context));
                };
        }
        if (hook) {
            if (options.functional) {
                // register for functional component in vue file
                var originalRender = options.render;
                options.render = function renderWithStyleInjection(h, context) {
                    hook.call(context);
                    return originalRender(h, context);
                };
            }
            else {
                // inject component registration as beforeCreate hook
                var existing = options.beforeCreate;
                options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
            }
        }
        return script;
    }

    var isOldIE = typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    function createInjector(context) {
        return function (id, style) { return addStyle(id, style); };
    }
    var HEAD;
    var styles = {};
    function addStyle(id, css) {
        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
        if (!style.ids.has(id)) {
            style.ids.add(id);
            var code = css.source;
            if (css.map) {
                // https://developer.chrome.com/devtools/docs/javascript-debugging
                // this makes source maps inside style tags work properly in Chrome
                code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
                // http://stackoverflow.com/a/26603875
                code +=
                    '\n/*# sourceMappingURL=data:application/json;base64,' +
                        btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                        ' */';
            }
            if (!style.element) {
                style.element = document.createElement('style');
                style.element.type = 'text/css';
                if (css.media)
                    { style.element.setAttribute('media', css.media); }
                if (HEAD === undefined) {
                    HEAD = document.head || document.getElementsByTagName('head')[0];
                }
                HEAD.appendChild(style.element);
            }
            if ('styleSheet' in style.element) {
                style.styles.push(code);
                style.element.styleSheet.cssText = style.styles
                    .filter(Boolean)
                    .join('\n');
            }
            else {
                var index = style.ids.size - 1;
                var textNode = document.createTextNode(code);
                var nodes = style.element.childNodes;
                if (nodes[index])
                    { style.element.removeChild(nodes[index]); }
                if (nodes.length)
                    { style.element.insertBefore(textNode, nodes[index]); }
                else
                    { style.element.appendChild(textNode); }
            }
        }
    }

    /* script */
    var __vue_script__ = script;

    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "div",
        {
          staticClass: "base-component",
          style:
            "height:" + _vm.size * 1.2 + "px; max-width:" + _vm.size * 1.2 + "px"
        },
        [
          _c("div", { staticClass: "circle-border", style: _vm.borderStyle }, [
            _c("div", { staticClass: "shadow-circle", style: _vm.baseStyle }),
            _vm._v(" "),
            _c("div", { staticClass: "base-circle", style: _vm.baseStyle }, [
              _c("div", { style: _vm.baseHold, attrs: { id: "active-half-1" } }, [
                _c("div", { style: _vm.basePie1 })
              ]),
              _vm._v(" "),
              _vm.perc > 50
                ? _c(
                    "div",
                    { style: _vm.baseHold2, attrs: { id: "active-half-2" } },
                    [_c("div", { style: _vm.basePie2 })]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("div", { staticClass: "info-circle" }, [
                _c("div", { staticClass: "info-text" }, [
                  _c("div", { staticClass: "value" }, [
                    _vm._v(
                      "\n                        " +
                        _vm._s(_vm.value) +
                        "\n                    "
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "perc", style: "color:" + _vm.color }, [
                    _vm._v(
                      "\n                        " +
                        _vm._s(_vm.perc) +
                        "%\n                    "
                    )
                  ])
                ])
              ])
            ])
          ])
        ]
      )
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      var __vue_inject_styles__ = function (inject) {
        if (!inject) { return }
        inject("data-v-0fdb2ce0_0", { source: "\n.base-component{\r\n    position: relative;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-content: center;\r\n    align-items: center;\r\n    margin: 0;\r\n    box-sizing: border-box;\n}\n.circle-border{\r\n    position: relative;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-content: center;\r\n    align-items: center;\r\n    border-radius: 100%;\r\n    background-color: #EFF5F6;\r\n    overflow: hidden;\r\n    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25) ,  1px 1px 4px rgba(0, 0, 0, 0.2);\n}\n.shadow-circle {\r\n\r\n    position: absolute;\r\n    display: block;\r\n    border-radius: 100%;\r\n    background-color: transparent;\r\n    overflow: hidden;\r\n    box-shadow: inset 4px 4px 20px rgba(0, 0, 0, 0.1);\r\n    \r\n    /* box-shadow: 4px 4px 10px rgba(0,0,0,0.25) */\n}\n.base-circle {\r\n    position: relative;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-content: center;\r\n    align-items: center;\r\n    border-radius: 100%;\r\n    background-color: #EFF5F6;\r\n    overflow: hidden;\r\n    box-shadow: inset 4px 4px 20px rgba(0, 0, 0, 0.25);\r\n    \r\n    /* box-shadow: 4px 4px 10px rgba(0,0,0,0.25) */\n}\n#active-half-1 {\r\n    transform: rotate(0deg);\n}\n#active-half-2 {\r\n    transform: rotate(180deg);\r\n    /* box-shadow: 1px 1px 20px rgba(255, 0, 184, 0.4), inset 4px 4px 20px rgba(0, 0, 0, 0.25); */\r\n    /* box-shadow: 1px 1px 20px rgba(255, 0, 184, 0.4); */\n}\n.info-circle {\r\n    \r\n    position: relative;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-content: center;\r\n    align-items: center;\r\n    width: 70%;\r\n    height: 70%;\r\n    background-color: #ffffff;\r\n    border-radius: 100%;\r\n    box-shadow: 6px 6px 20px rgba(0, 0, 0, 0.35), inset 2px 2px 2px #FFFFFF, inset 6px 6px 30px rgba(0, 0, 0, 0.15), inset -1px -1px 2px rgba(0, 0, 0, 0.3), inset -2px -2px 20px #ffffff;\r\n    /* box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25), inset 6px 6px 20px rgba(0, 0, 0, 0.1), inset 1px 1px 2px #FFFFFF; */\n}\n.info-text{\r\n    color: #5F758F;\r\n    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n    text-align: center;\n}\n.value{\r\n    font-size: 2rem;\r\n    font-weight: 900;\n}\n.perc{\r\n    font-size: 0.650rem;\r\n    font-weight: 700;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\marce\\OneDrive\\Documentos\\projetos-vue\\componentes\\ml-chart-circle\\src\\ml-chart-circle.vue"],"names":[],"mappings":";AAgKA;IACA,kBAAA;IACA,aAAA;IACA,uBAAA;IACA,qBAAA;IACA,mBAAA;IACA,SAAA;IACA,sBAAA;AAEA;AAEA;IACA,kBAAA;IACA,aAAA;IACA,uBAAA;IACA,qBAAA;IACA,mBAAA;IACA,mBAAA;IACA,yBAAA;IACA,gBAAA;IACA,8EAAA;AAEA;AAGA;;IAEA,kBAAA;IACA,cAAA;IACA,mBAAA;IACA,6BAAA;IACA,gBAAA;IACA,iDAAA;;IAEA,8CAAA;AACA;AAEA;IACA,kBAAA;IACA,aAAA;IACA,uBAAA;IACA,qBAAA;IACA,mBAAA;IACA,mBAAA;IACA,yBAAA;IACA,gBAAA;IACA,kDAAA;;IAEA,8CAAA;AACA;AAGA;IACA,uBAAA;AAEA;AACA;IACA,yBAAA;IACA,6FAAA;IACA,qDAAA;AAEA;AAGA;;IAEA,kBAAA;IACA,aAAA;IACA,uBAAA;IACA,qBAAA;IACA,mBAAA;IACA,UAAA;IACA,WAAA;IACA,yBAAA;IACA,mBAAA;IACA,qLAAA;IACA,oHAAA;AAEA;AAEA;IACA,cAAA;IACA,4DAAA;IACA,kBAAA;AACA;AAEA;IACA,eAAA;IACA,gBAAA;AACA;AAEA;IACA,mBAAA;IACA,gBAAA;AACA","file":"ml-chart-circle.vue","sourcesContent":["<template>\r\n    <div class=\"base-component\" :style=\"'height:'+(size*1.2)+'px; max-width:'+(size*1.2)+'px'\">\r\n        <div class=\"circle-border\" :style=\"borderStyle\">\r\n            <div class=\"shadow-circle\" :style=\"baseStyle\"></div>\r\n            <div class=\"base-circle\" :style=\"baseStyle\">\r\n                <div id=\"active-half-1\"  :style=\"baseHold\" ><div :style=\"basePie1\" ></div></div>\r\n                <div id=\"active-half-2\" v-if=\"perc > 50\" :style=\"baseHold2\" ><div :style=\"basePie2\" ></div></div>\r\n                <div class=\"info-circle\">\r\n                    <div class=\"info-text\">\r\n                        <div class=\"value\">\r\n                            {{value}}\r\n                        </div>\r\n                        <div class=\"perc\" :style=\"'color:'+color\">\r\n                            {{perc}}%\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n       \r\n    </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n    name: 'ml-chart-circle',\r\n    props: {\r\n        value: {\r\n            type: Number,\r\n            default: 30\r\n        },\r\n        perc: {\r\n            type: Number,\r\n            default: 42\r\n        },\r\n        text: {\r\n            type: String,\r\n            default: 'Testing chart'\r\n        },\r\n        size: {\r\n            type: Number,\r\n            default: 150\r\n        },\r\n        color: {\r\n            type: String,\r\n            default: '#1aff1a'\r\n        }\r\n    },\r\n    data() {\r\n        return {}\r\n    },\r\n    computed: {\r\n       \r\n        \r\n        baseStyle: function() {\r\n            let styleB = {\r\n                height: `${this.size}px`,\r\n                width: `${this.size}px`,\r\n            }\r\n\r\n            return styleB\r\n        },\r\n\r\n        borderStyle: function(){\r\n            let border = {\r\n               \r\n                height: `${this.size*1.05}px`,\r\n                width: `${this.size*1.05}px`,\r\n                \r\n            }\r\n\r\n            return border\r\n        },\r\n\r\n        baseHold: function(){\r\n            let hold = {\r\n                position: 'absolute',\r\n                height: `${this.size}px`,\r\n                width: `${this.size}px`,\r\n                clip: `rect(0px, ${this.size}px, ${this.size}px, ${this.size/2}px)`\r\n            }\r\n\r\n            return hold\r\n        },\r\n        baseHold2: function(){\r\n            let hold = {\r\n                position: 'absolute',\r\n                height: `${this.size}px`,\r\n                width: `${this.size}px`,\r\n                clip: `rect(0px, ${this.size}px, ${this.size}px, ${(this.size/2)-1}px)`\r\n            }\r\n\r\n            return hold\r\n        },\r\n\r\n        basePie1: function(){\r\n            let rectRight = Math.ceil(this.size/2)\r\n            // 50 -> 180\r\n            // 30 -> x\r\n            // 50x = 30*180 :: x = (30*180) / 50 :: x = (perc*180) / 50\r\n            let degrees = 180\r\n            if (this.perc < 50) {\r\n                degrees = Math.ceil((this.perc*180) / 50)\r\n            }\r\n            let pie = {\r\n                transition: 'all 1s',\r\n                position: 'absolute',\r\n                height: `${this.size}px`,\r\n                width: `${this.size}px`,\r\n                backgroundColor: this.color,\r\n                transform: `rotate(${degrees}deg)`,\r\n                clip: `rect(0px, ${rectRight}px, ${this.size}px, 0px)`,\r\n            }\r\n\r\n            return pie\r\n        },\r\n\r\n        basePie2: function(){\r\n            let rectRight = Math.ceil(this.size/2) + 10\r\n            // 50 -> 180\r\n            // 30 -> x\r\n            // 50x = 30*180 :: x = (30*180) / 50 :: x = (perc*180) / 50\r\n            let degrees = 0\r\n            if (this.perc > 50) {\r\n                if (this.perc <= 100) {\r\n                    \r\n                    degrees = Math.ceil(((this.perc-50)*180) / 50)\r\n                    this.perc >= 97 ? degrees -= 4 : null\r\n\r\n                } else {\r\n                    degrees = 180\r\n                }\r\n                \r\n            }\r\n            let pie = {\r\n                transition: 'all 1s',\r\n                position: 'absolute',\r\n                height: `${this.size}px`,\r\n                width: `${this.size}px`,\r\n                backgroundColor: this.color,\r\n                transform: `rotate(${degrees}deg)`,\r\n                clip: `rect(0px, ${rectRight}px, ${this.size}px, 0px)`,\r\n                \r\n            }\r\n\r\n            return pie\r\n        },\r\n\r\n        \r\n\r\n    }\r\n\r\n}\r\n</script>\r\n\r\n<style>\r\n\r\n\r\n\r\n.base-component{\r\n    position: relative;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-content: center;\r\n    align-items: center;\r\n    margin: 0;\r\n    box-sizing: border-box;\r\n    \r\n}\r\n\r\n.circle-border{\r\n    position: relative;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-content: center;\r\n    align-items: center;\r\n    border-radius: 100%;\r\n    background-color: #EFF5F6;\r\n    overflow: hidden;\r\n    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25) ,  1px 1px 4px rgba(0, 0, 0, 0.2);\r\n    \r\n}\r\n\r\n\r\n.shadow-circle {\r\n\r\n    position: absolute;\r\n    display: block;\r\n    border-radius: 100%;\r\n    background-color: transparent;\r\n    overflow: hidden;\r\n    box-shadow: inset 4px 4px 20px rgba(0, 0, 0, 0.1);\r\n    \r\n    /* box-shadow: 4px 4px 10px rgba(0,0,0,0.25) */\r\n}\r\n\r\n.base-circle {\r\n    position: relative;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-content: center;\r\n    align-items: center;\r\n    border-radius: 100%;\r\n    background-color: #EFF5F6;\r\n    overflow: hidden;\r\n    box-shadow: inset 4px 4px 20px rgba(0, 0, 0, 0.25);\r\n    \r\n    /* box-shadow: 4px 4px 10px rgba(0,0,0,0.25) */\r\n}\r\n\r\n\r\n#active-half-1 {\r\n    transform: rotate(0deg);\r\n    \r\n}\r\n#active-half-2 {\r\n    transform: rotate(180deg);\r\n    /* box-shadow: 1px 1px 20px rgba(255, 0, 184, 0.4), inset 4px 4px 20px rgba(0, 0, 0, 0.25); */\r\n    /* box-shadow: 1px 1px 20px rgba(255, 0, 184, 0.4); */\r\n    \r\n}\r\n\r\n\r\n.info-circle {\r\n    \r\n    position: relative;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-content: center;\r\n    align-items: center;\r\n    width: 70%;\r\n    height: 70%;\r\n    background-color: #ffffff;\r\n    border-radius: 100%;\r\n    box-shadow: 6px 6px 20px rgba(0, 0, 0, 0.35), inset 2px 2px 2px #FFFFFF, inset 6px 6px 30px rgba(0, 0, 0, 0.15), inset -1px -1px 2px rgba(0, 0, 0, 0.3), inset -2px -2px 20px #ffffff;\r\n    /* box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25), inset 6px 6px 20px rgba(0, 0, 0, 0.1), inset 1px 1px 2px #FFFFFF; */\r\n    \r\n}\r\n\r\n.info-text{\r\n    color: #5F758F;\r\n    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n    text-align: center;\r\n}\r\n\r\n.value{\r\n    font-size: 2rem;\r\n    font-weight: 900;\r\n}\r\n\r\n.perc{\r\n    font-size: 0.650rem;\r\n    font-weight: 700;\r\n}\r\n</style>"]}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__ = undefined;
      /* module identifier */
      var __vue_module_identifier__ = undefined;
      /* functional template */
      var __vue_is_functional_template__ = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__ = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        createInjector,
        undefined,
        undefined
      );

    // Importa o componente

    // Declara a função de instalação executada pelo Vue.use()
    function install(Vue) {
      if (install.installed) { return; }
      install.installed = true;
      Vue.component('MlChartCircle', __vue_component__);
    }

    // Cria a definição do módulo para Vue.use()
    var plugin = {
      install: install,
    };

    // Auto-instala quando o Vue é encontrado (no navegador via <script>)
    var GlobalVue = null;
    if (typeof window !== 'undefined') {
      GlobalVue = window.Vue;
    } else if (typeof global !== 'undefined') {
      GlobalVue = global.Vue;
    }
    if (GlobalVue) {
      GlobalVue.use(plugin);
    }

    exports.default = __vue_component__;
    exports.install = install;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
