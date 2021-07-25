export default {
  install(Vue, params) {
    const defaultEvent = "click";
    const isNumberString = (value) => /\d+/.test(value);
    const { name, time, dev } = params || {};
    const directive = typeof name === "string" ? name : "v-throttle";
    const defaultTime = isNumberString(time) ? Number(time) : 1000;
    Vue.directive(directive.replace("v-", ""), {
      bind(el, options) {
        let sharedTimer = null;
        const { rawName, value } = options;
        let action = typeof value === "function" ? value : () => value;
        const [, ...values] = rawName.split(".");
        if (!values[0] || isNumberString(values[0]) || values[0] === "private")
          values.unshift(defaultEvent);
        const eventList = [];
        values.forEach((value) => {
          const lastEvent = eventList[eventList.length - 1];
          if (lastEvent && isNumberString(value)) {
            lastEvent.time = Number(value);
          } else if (value === "private") {
            lastEvent.isPrivate = true;
          } else {
            eventList.push({
              event: value,
              time: defaultTime,
            });
          }
        });
        const bindEvent = (_event, _time, timer, isPrivate) => {
          const time = isNumberString(_time) ? Number(_time) : defaultTime;
          let event = _event;
          if (_event === "touch") {
            event = "touchend";
            if (dev) {
              console.warn(`${directive}: ${_event} will run as touchend`);
            }
          }
          if (["on" + event] in el) {
            el.addEventListener(event, (e) => {
              if (isPrivate ? timer : sharedTimer) return;
              else {
                action(e);
                if (isPrivate) {
                  timer = setTimeout(() => {
                    timer = null;
                  }, time);
                } else {
                  sharedTimer = setTimeout(() => {
                    sharedTimer = null;
                  }, time);
                }
              }
            });
          } else {
            console.error(`${directive}: ${event} can not add event`, el);
          }
        };
        if (dev) console.log(eventList);
        eventList.forEach(({ event, time, isPrivate }) => {
          let timer = null;
          bindEvent(event, time, timer, isPrivate);
        });
      },
    });
  },
};
