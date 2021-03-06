// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import {autoinject} from 'aurelia-framework';
import {UIEvent} from "../resources/utils/ui-event";
import {UITreeOptions} from "../resources/utils/ui-tree-model";

@autoinject()
export class TreeComponent {
  constructor() {
    this.makeTeeModel();
  }

  // aurelia hooks
  canActivate(model) { return true; }
  activate(model) { return true; }
  bind(bindingContext) { }
  attached() { }
  detached() { }
  unbind() { }
  deactivate() { }
  // end aurelia hooks

  treeModel = [];
  treeOpts = new UITreeOptions({
    showCheckbox: true,
    selectionLevel: 1,
    checkboxLevel: 0
  });
  treeSelected = null;
  countries = _.mapKeys(window.Countries.list, 'iso3');

  makeTeeModel() {
    var ct = [];
    _.forEach(_.chain(window.Countries.list).sortBy('continent').groupBy('continent').value(), (v: any, k: string) => {
      let c = {
        id: _.camelCase(k),
        text: k,
        icon: 'fi-ui-line-folder-closed',
        openIcon: 'fi-ui-line-folder-open',
        expanded: k == 'Asia',
        children: []
      }
      _.forEach(_.sortBy(v, 'name'), (o: any) => {
        c.children.push({
          id: o.iso3,
          text: o.name,
          leaf: true,
          icon: `ui-flag ${o.iso3}`
        })
      });
      ct.push(c);
    });
    this.treeModel = ct;
  }

  clearSelection() {
    this.treeSelected = null;
    this.treeOpts.showCheckbox = !this.treeOpts.showCheckbox;
  }
}