import {
  MatOptgroup,
  MatOption
} from "./chunk-QIUZTDUX.js";
import {
  MatPseudoCheckboxModule
} from "./chunk-7WCVVWTO.js";
import {
  MatRippleModule
} from "./chunk-WG2TPZHV.js";
import {
  MatCommonModule
} from "./chunk-PWLCA5EN.js";
import {
  NgModule,
  setClassMetadata,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-I3YILU5Q.js";

// node_modules/@angular/material/fesm2022/index-DOxJc1m4.mjs
var MatOptionModule = class _MatOptionModule {
  static ɵfac = function MatOptionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatOptionModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MatOptionModule,
    imports: [MatRippleModule, MatCommonModule, MatPseudoCheckboxModule, MatOption, MatOptgroup],
    exports: [MatOption, MatOptgroup]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [MatRippleModule, MatCommonModule, MatPseudoCheckboxModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatOptionModule, [{
    type: NgModule,
    args: [{
      imports: [MatRippleModule, MatCommonModule, MatPseudoCheckboxModule, MatOption, MatOptgroup],
      exports: [MatOption, MatOptgroup]
    }]
  }], null, null);
})();

export {
  MatOptionModule
};
//# sourceMappingURL=chunk-5SJFNEEP.js.map
