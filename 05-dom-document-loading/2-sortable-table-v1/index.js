const ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this._headerConfig = [...headerConfig];
    this._data = [...data];

    this._render(this._headerConfig, this._data);
  }

  _createElement() {
    if (this.element) {
      return;
    }

    this.element = document.createElement('div');
    this.element.classList.add('sortable-table');
  }

  _renderHeader(headerConfig) {
    const template = `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${headerConfig.map(cell => `
          <div class="sortable-table__cell" data-id="${cell.id}" data-sortable="${cell.sortable}" ${this.order ? `data-order="${this.order}"` : ''}>
            <span>${cell.title}</span>
            ${cell.sortable ? `
              <span data-element="arrow" class="sortable-table__sort-arrow">
                <span class="sort-arrow"></span>
              </span>
            ` : ''}
          </div>
        `.replace(/\n\s+/g, '')).join('')}
      </div>
    `;

    return template;
  }

  _renderBody(headerConfig, data) {
    const template = `
      <div data-element="body" class="sortable-table__body">
        ${data.map(item => `
          <a href="/products/${item.id}" class="sortable-table__row">
            ${headerConfig.map(cell => `
              ${typeof cell.template === 'function'
                ? cell.template(item[cell.id])
                : `
                  <div class="sortable-table__cell">${item[cell.id]}</div>
                `}
            `.replace(/\n\s+/g, '')).join('')}
          </a>
        `.replace(/\n\s+/g, '')).join('')}
      </div>
    `;

    return template;
  }

  _render(headerConfig, data) {
    this._createElement();

    this.element.innerHTML = `
      ${this._renderHeader(headerConfig)}
      ${this._renderBody(headerConfig, data)}
    `;

    this.subElements = {
      header: this.element.querySelector('[data-element="header"]'),
      body: this.element.querySelector('[data-element="body"]'),
    };
  }

  _getSortDirection(order) {
    const directions = {
      asc: 1,
      desc: -1,
    };

    return directions[order];
  }

  _getSortType(field) {
    const findedItem = this._headerConfig.find(item => item.id === field);

    if (findedItem && findedItem.sortType) {
      return findedItem.sortType;
    }

    return;
  }

  _sortByNumberField(arr, field, order = ORDER.ASC) {
    const arrCopy = [...arr];
    const orderNumber = this._getSortDirection(order);

    arrCopy.sort((a, b) => {
      return (a[field] - b[field])  * orderNumber;
    });

    return arrCopy;
  }

  _sortByStringField(arr, field, order = ORDER.ASC) {
    const arrCopy = [...arr];
    const orderNumber = this._getSortDirection(order);

    arrCopy.sort((a, b) => {
      return a[field].localeCompare(b[field], ['ru-RU', 'en-GB'], { caseFirst: 'upper' }) * orderNumber;
    });

    return arrCopy;
  }

  sort(field, order) {
    const sortType = this._getSortType(field);

    if (sortType === 'number') {
      this._render(
        this._headerConfig,
        this._sortByNumberField(this._data, field, order)
      );
    }

    if (sortType === 'string') {
      this._render(
        this._headerConfig,
        this._sortByStringField(this._data, field, order)
      );
    }
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}

