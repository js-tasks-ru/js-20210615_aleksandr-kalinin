const CHART_HEIGHT = 50;
const ELEMENT_CLASS = 'column-chart';
const ELEMENT_LOADING_CLASS = 'column-chart_loading';

export default class ColumnChart {
  constructor(options = {}) {
    const {
      data = [],
      label = '',
      value = 0,
      link = '',
      formatHeading = data => data,
    } = options;

    this.chartHeight = CHART_HEIGHT;

    this._data = Array.isArray(data) ? data : [];
    this._label = label;
    this._value = value;
    this._link = link;
    this._formatHeading = formatHeading;

    this._render();
  }

  _createElement() {
    if (this.element) {
      return;
    }

    const classNames = [ELEMENT_CLASS];

    if (this._data.length === 0) {
      classNames.push(ELEMENT_LOADING_CLASS);
    }

    this.element = document.createElement('div');
    this.element.classList.add(...classNames);
    this.element.style.setProperty('--chart-height', this.chartHeight);
  }

  _getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  _getColumnTemplate() {
    const data = this._getColumnProps(this._data);

    return data.map(item => {
      return `<div style="--value: ${item.value}" data-tooltip="${item.percent}"></div>`;
    }).join('');
  }

  _render() {
    this._createElement();

    const linkTemplate = this._link
      ? `<a href="${this._link}" class="column-chart__link">View all</a>`
      : '';

    const headerTemplate = this._value
      ? `<div data-element="header" class="column-chart__header">${this._formatHeading(this._value)}</div>`
      : '';

    const columnTemplate = this._getColumnTemplate();

    const template = `
      <div class="column-chart__title">
        Total ${this._label}
        ${linkTemplate}
      </div>
      <div class="column-chart__container">
        ${headerTemplate}
        <div data-element="body" class="column-chart__chart">
          ${columnTemplate}
        </div>
      </div>
    `;

    this.element.innerHTML = template;
  }

  update(data = []) {
    const bodyElement = this.element.querySelector('.column-chart__chart');

    this._data = Array.isArray(data) ? data : [];

    if (bodyElement) {
      const columnTemplate = this._getColumnTemplate();
      bodyElement.innerHTML = columnTemplate;
    }
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}
