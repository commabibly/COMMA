import Toast from "react-native-easy-toast";
import React from "react";

export default class ToastInstance extends React.Component {
  showToast = (duration) => this.refs.toast.show("hello world!", duration);

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.showToast(nextProps.duration);
    }
  }

  render() {
    return <Toast ref="toast" opacity={0.8} />;
  }
}
