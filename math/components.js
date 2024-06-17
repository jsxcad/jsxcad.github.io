class RuledLine extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host { 
          display: block;
          background-color: #fff;
          background-image: linear-gradient(to bottom,
                                            transparent 0em .53em, gray .54em .54em,
                                            transparent .55em .81em, gray .82em .83em,
                                            transparent .84em 1.3em, black 1.3em 1.33em,
                                            transparent 1.34em 1.59em, gray 1.6em 1.61em,
                                            transparent 1.62em 1.8em, transparent 2em
                                            );
          background-size: 100% 2em;
          background-repeat: repeat-y;
          line-height: 2em;
          height: 2em;
        }
      </style>
      <slot></slot>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
// Register the custom element
customElements.define('ruled-line', RuledLine);
