import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY,
  MAT_TOOLTIP_SCROLL_STRATEGY,
  MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY,
  MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
  MatTooltip,
  MatTooltipModule,
  SCROLL_THROTTLE_MS,
  TOOLTIP_PANEL_CLASS,
  TooltipComponent,
  getMatTooltipInvalidPositionError
} from "./chunk-BQ5UJGY4.js";
import "./chunk-PV6DH5SK.js";
import "./chunk-OZ7C5UV6.js";
import "./chunk-QVG7D74W.js";
import "./chunk-OIBNGD5S.js";
import "./chunk-DJAN5T6O.js";
import "./chunk-42FJBLFI.js";
import "./chunk-GV5LUSDY.js";
import "./chunk-KNACLSCK.js";
import "./chunk-2O4WY5GE.js";
import "./chunk-GVKRYOKP.js";
import "./chunk-O5LM4YQL.js";
import "./chunk-WBDYPRQ3.js";
import "./chunk-TBZTVGHX.js";
import "./chunk-KQB4LJPA.js";
import "./chunk-MMVZ32PN.js";
import "./chunk-VV64KWF3.js";
import "./chunk-CDSAZYM2.js";
import "./chunk-Z65OBI5T.js";
import "./chunk-52CUPXGP.js";
import "./chunk-U5HUDSGL.js";
import "./chunk-SW56KKTC.js";
import "./chunk-WLXPCB7Q.js";
import "./chunk-I3YILU5Q.js";
import "./chunk-ISM5WLAM.js";
import "./chunk-IC62NIWK.js";
import "./chunk-ZZ67MR3E.js";
import "./chunk-N6ESDQJH.js";

// node_modules/@angular/material/fesm2022/tooltip.mjs
var matTooltipAnimations = {
  // Represents:
  // trigger('state', [
  //   state('initial, void, hidden', style({opacity: 0, transform: 'scale(0.8)'})),
  //   state('visible', style({transform: 'scale(1)'})),
  //   transition('* => visible', animate('150ms cubic-bezier(0, 0, 0.2, 1)')),
  //   transition('* => hidden', animate('75ms cubic-bezier(0.4, 0, 1, 1)')),
  // ])
  /** Animation that transitions a tooltip in and out. */
  tooltipState: {
    type: 7,
    name: "state",
    definitions: [{
      type: 0,
      name: "initial, void, hidden",
      styles: {
        type: 6,
        styles: {
          opacity: 0,
          transform: "scale(0.8)"
        },
        offset: null
      }
    }, {
      type: 0,
      name: "visible",
      styles: {
        type: 6,
        styles: {
          transform: "scale(1)"
        },
        offset: null
      }
    }, {
      type: 1,
      expr: "* => visible",
      animation: {
        type: 4,
        styles: null,
        timings: "150ms cubic-bezier(0, 0, 0.2, 1)"
      },
      options: null
    }, {
      type: 1,
      expr: "* => hidden",
      animation: {
        type: 4,
        styles: null,
        timings: "75ms cubic-bezier(0.4, 0, 1, 1)"
      },
      options: null
    }],
    options: {}
  }
};
export {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY,
  MAT_TOOLTIP_SCROLL_STRATEGY,
  MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY,
  MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
  MatTooltip,
  MatTooltipModule,
  SCROLL_THROTTLE_MS,
  TOOLTIP_PANEL_CLASS,
  TooltipComponent,
  getMatTooltipInvalidPositionError,
  matTooltipAnimations
};
//# sourceMappingURL=@angular_material_tooltip.js.map
