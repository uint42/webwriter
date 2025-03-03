import { localized, msg } from "@lit/localize"
import {LitElement, html, css, PropertyValueMap} from "lit"
import {customElement, property, query, queryAssignedElements} from "lit/decorators.js"

@localized()
@customElement("ww-layout")
export class Layout extends LitElement {

  @property({type: Boolean, attribute: true, reflect: true})
  foldOpen: boolean = false

  @property({type: Boolean, attribute: true, reflect: true})
  hideAsides: boolean = false

  @property({type: Boolean, attribute: true})
  loading: boolean = false
	
  render() {
    return html`
      <slot name="header-left"></slot>
      <nav>
        <slot name="nav"></slot>
      </nav>
      <slot name="header-right"></slot>
      <slot name="fold"></slot>
      <slot name="main"></slot>
    `
  }

  static styles = css`
    :host {
      --ww-left-margin-width: 1fr;
      display: grid;
      grid-template-columns: 16px minmax(auto, var(--ww-left-margin-width)) 80px minmax(auto, 680px) 80px 1fr 16px;
      grid-template-rows: minmax(50px, max-content) max-content 1fr;
      align-items: flex-start;
      height: 100vh;
      width: 100vw;
    }

    @media only screen and (min-width: 1130px) and (max-width: 1380px) {
      :host {
        --ww-left-margin-width: 0px;
      }
    }

    
    slot[name=header-left]::slotted(*) {
      min-height: 50px;
      grid-column: 2 / 4;
      grid-row: 1;
      z-index: 12;
    }

    nav {
      min-height: 50px;
      grid-column: 4;
      grid-row: 1;
      position: relative;
      margin-bottom: -1px;
      z-index: 11;
      display: flex;
      flex-direction: row;
      overflow: hidden;
    }

    slot[name=header-right]::slotted(*) {
      min-height: 50px;
      overflow-y: visible;
      grid-column: 5 / 7;
      grid-row: 1;
      z-index: 12;
    }

    slot[name=main]::slotted(:not([data-active]):not(#initializingPlaceholder)) {
      display: none !important;
    }

    slot[name=main]::slotted(#initializingPlaceholder) {
      grid-column: 1 / 8;
      grid-row: 1 / 5;
    }

    slot[name=fold]::slotted(*) {
      transition: cubic-bezier(0.23, 1, 0.320, 1) 0.75s;
      transition-property: max-height box-shadow;
      width: 100%;
      justify-self: end;
    }

    slot[name=fold]::slotted(*) {
      box-sizing: border-box;
      grid-row: 2;
      grid-column: 3 / 6; 
      background: white;
      // border: 1px solid lightgray;
      // border-top: 14px solid var(--sl-color-gray-100);
      // border-left: 0;
      // border-right: 0;
      max-height: 0;
      overflow: hidden;
    }

    :host(:not([foldopen])) slot[name=fold]::slotted(*) {
      max-height: 0;
    }

    slot[name=fold]::slotted(*:hover) {
      max-height: 56px !important;
      // box-shadow: 0 -14px 0 0 var(--sl-color-gray-100);
      // border: 1px solid lightgray !important;
    }

    :host([foldopen]) slot[name=fold]::slotted(*) {
      max-height: 60vh !important;
      border: 1px solid lightgray !important;
      // border: 1px solid lightgray !important;
    }

    :host([hideasides]) aside {
      display: none;
    }

    :host([hideasides]) main {
      grid-column: 2 / 6;
    }



    @media only print {
      :host > :not(slot[name=main]) {
        display: none !important;
      } 
      slot[name=main] {
        grid-column: 1 / 7;
      }
    }
  `

	@query("[part=tabs-wrapper]")
	tabsWrapper: HTMLElement

  @query("nav")
  nav: HTMLElement

  @queryAssignedElements({slot: "main"})
  panels: HTMLElement[] | null
}