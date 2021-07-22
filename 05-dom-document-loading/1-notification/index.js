let activeNotifications = [];

export default class NotificationMessage {
  constructor(message, {
    duration = 2000,
    type = 'success'
  } = {}) {
    this._id = (new Date()).getTime();
    this._durationInSecs = duration / 1000;
    this.duration = duration;
    this.message = message;
    this.type = type;

    this._render();
  }

  _createElement() {
    if (this.element) {
      return;
    }

    this.element = document.createElement('div');
    this.element.classList.add('notification', this.type);
    this.element.style.setProperty('--value', `${this._durationInSecs}s`);
  }

  _render() {
    this._createElement();

    const template = `
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">${this.type}</div>
        <div class="notification-body">
          ${this.message}
        </div>
      </div>
    `;

    this.element.innerHTML = template;
  }

  clearTimer() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  show(container) {
    activeNotifications.forEach(n => n.hide());
    activeNotifications = [];
    activeNotifications.push(this);

    if (container) {
      container.append(this.element);
    } else {
      document.body.append(this.element);
    }

    this.clearTimer();

    this.timerId = setTimeout(() => {
      this.hide();
    }, this.duration);
  }

  hide() {
    activeNotifications = activeNotifications.filter(n => n._id !== this._id);

    this.clearTimer();
    this.remove();
  }

  remove() {
    this.clearTimer();

    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}
