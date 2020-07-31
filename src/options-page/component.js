import { LitElement, css, html } from 'lit-element';

class OptionsPage extends LitElement {
  static get styles() {
    return css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: sans-serif;
      }
      .wrapper {
        display: flex;
        position: relative;
      }

      .sidebar {
        position: fixed;
        width: 200px;
        height: 100%;
        background: #4b4276;
        padding: 30px 0;
      }

      .sidebar__header {
        color: #fff;
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 30px;
      }

      .sidebar__listItem {
        padding: 15px;
        border-bottom: 1px solid #bdb8d7;
        border-bottom: 1px solid rgba(0,0,0,0.05);
        border-top: 1px solid rgba(255,255,255,0.05);
        list-style: none;
      }

      .sidebar__listItem--selected {
        background-color: #594f8d;
      }

      .sidebar__link {
        color: #bdb8d7;
        display: block;
        text-decoration: none;
        font-size: 16px;
      }

      .sidebar__listItem--selected .sidebar__link {
        color: #fff;
      }

      .content {
        width: 100%;
        margin-left: 200px;
      }

      .content__header {
        padding: 20px;
        background: #fff;
        color: #717171;
        border-bottom: 1px solid #e0e4e8;
        font-size: 16px;
      }

      .content__info {
        margin: 20px;
        color: #717171;
        line-height: 25px;
        font-size: 14px;
      }

      .item {
        display: flex;
        align-items: center;
        height: 50px;
      }

      .item__label {
        width: 200px;
      }

      .item__check {
        margin-left: 10px;
        width: 20px;
        height: 20px;
      }

      lit-toast {
        --lt-border: 2px solid #fff;
        --lt-background-color: #594f8d;
        --lt-color: #fff;
      }

      select {
        margin: 10px;
        width: 150px;
        padding: 5px 35px 5px 5px;
        font-size: 14px;
        border: 1px solid #CCC;
        height: 30px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAQAAABvcdNgAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfkAwoUEDAeKEDRAAABPElEQVRYw+3TLyxFURzA8Y8/M3ubjU0QFIVAYDMSiUSiaTQajUaj0WgkGolEIZFsL9gEgvCCzWYzM8/VzP9333vnKc73lLsbzmf33N8hFovFYrF/VNXbU68O+cC717hw9vlln6xE3kuglZfI6v/OH3ApCbguDf70qUOugjHXhn871RE3QZgbo4V+4Jhc2UzOeJpZmXBbFnNrIu1YTrormbkzlX7+q0y7L4m5N/Pubqao2qyHopkHc6qLYaDWvMeimEcLaotloM6ip9TMkyV1pTBQb9lzKubZivpSGchYlS/IvFiTKYeBBusFoQ0N5TLQaPNXZktTCAaabf/I7GgOxUCL3W+ZPS0hGWi1/4U50BqagTaHH5gjbZVgoN3xG3OivVIMdDqVSJzqqiQDPc6d66k0A91/w8RisViwXgEGn+bllILWKwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wMy0xMFQyMDoxNTozOCswMDowMFPFsrUAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDMtMTBUMjA6MTU6MzgrMDA6MDAimAoJAAAAAElFTkSuQmCC') 95% / 13% no-repeat #EEE;
      }
    `;
  }

  static get properties() {
    return {
      bankOptions: { type: Array },
      bankCode: { type: String },
      enableContextMenu: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.bankOptions = [
      { label: 'ING Bank', value: 'INGB' },
      { label: 'ABN Amro', value: 'ABNA' },
    ];

    // get data from storage
    chrome.storage.sync.get({
      bankCode: 'INGB',
      enableContextMenu: true,
    }, (data) => {
      this.bankCode = data.bankCode;
      this.enableContextMenu = data.enableContextMenu;
    });
  }

  onChange(e) {
    const { target } = e;

    if (target.type === 'checkbox') {
      chrome.storage.sync.set({ enableContextMenu: target.checked });
    } else {
      chrome.storage.sync.set({ bankCode: target.value });
    }
  }

  render() {
    return html`
      <div class="wrapper">
      <div class="sidebar">
        <h2 class="sidebar__header">Setup IBAN Generator</h2>
        <ul>
          <li class="sidebar__listItem sidebar__listItem--selected"><a href="#" class="sidebar__link">Prefrences</a></li>
        </ul>
      </div>
    
      <div class="content">
        <div class="content__header">Change preferences for IBAN Generator here!</div>
        <div class="content__info">
          <section>
            <form>
              <div class="item">
                <label class="item__label">Bank: </label>
                <select id="bankCode" @change="${this.onChange}">
                  ${this.bankOptions.map((option) => html`
                    <option value="${option.value}" ?selected=${option.value === this.bankCode}>${option.label}</option>
                  `)}
                </select>
              </div>
              <div class="item">
                <label class="item__label">Enable context menu: </label>
                <input class="item__check" type="checkbox" id="enableContextMenu" ?checked=${this.enableContextMenu} @change="${this.onChange}"/>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
    `;
  }
}

customElements.define('options-page', OptionsPage);
