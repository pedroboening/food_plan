import React, { Component } from 'react';
import { ToastNotification } from 'carbon-components-react';
import * as ToastService from './service';

class Toast extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      notifications: [],
      isActive: false,
    };

    this.pushNotification = this.pushNotification.bind(this);
    this.removeNotification = this.removeNotification.bind(this);
  }

  componentDidMount() {
    ToastService.subscribe('open', this.pushNotification);
  }

  pushNotification(object) {
    const { notifications } = this.state;
    notifications.push(object);
    this.setState({
      notifications,
      isActive: true,
    }, this.removeNotification);
  }

  removeNotification(time) {
    setTimeout(() => {
      let { isActive } = this.state;
      const { notifications } = this.state;
      notifications.shift();
      if (!notifications.length) {
        isActive = false;
      }
      this.setState({
        notifications,
        isActive,
      });
    }, time || 5000);
  }

  render() {
    const { notifications, isActive } = this.state;
    return (
      <div className={`toast-container ${(isActive ? ' is-active' : '')}`}>
        {
          notifications.map((notification, i) => ((
            <div key={i}>
              <ToastNotification
                kind={notification.kind}
                role="alert"
                title={notification.title}
                subtitle={notification.subtitle}
                hideCloseButton
                caption=""
              />
            </div>
          )))
        }
      </div>
    );
  }
}

export default Toast;
