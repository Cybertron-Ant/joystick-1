import joystick from "../index";
import findComponentInTree from "./findComponentInTree";

const handleGetJoystickInstance = () => {
  if (typeof window !== "undefined") {
    return joystick && joystick.mountedInstance
      ? joystick
      : window.__joystick__;
  }

  return joystick;
};

const component = function component(Component, props) {
  try {
    const joystickInstance = handleGetJoystickInstance();
    const component = Component(props, this.url, this.translations);

    // NOTE: Re-use instance ID to avoid unnecessary re-renders in the DOM.
    if (Component.instance) {
      component.id = Component.instance.id;
    }

    // NOTE: this is bound to parent component instance inside of class.js.
    component.parent = this;

    // NOTE: Do this to ensure component is rendered in DOM before trying to set its
    // DOMNode back onto its instance AND that the node is available on this before we
    // assign any lifecycle methods, etc.
    joystickInstance._internal.lifecycle.onMount.array.push({
      callback: () => {
        component.handleSetDOMNode();
      },
    });

    if (component.options && component.options.lifecycle) {
      if (component.options.lifecycle.onBeforeMount) {
        joystickInstance._internal.lifecycle.onBeforeMount.array.push({
          callback: () => {
            component.options.lifecycle.onBeforeMount(component);
          },
        });
      }

      if (component.options.lifecycle.onMount) {
        joystickInstance._internal.lifecycle.onMount.array.push({
          callback: () => {
            component.options.lifecycle.onMount(component);
          },
        });
      }
    }

    // NOTE: When using joystick.ssr(), a separate tree is generated which is passed
    // in to the render functions via the renderToHTML function on the main component class.

    const parentInTree = findComponentInTree(
      component.parent.ssrTree || joystickInstance._internal.tree,
      component.parent.id
    );

    if (parentInTree && parentInTree.children) {
      parentInTree.children.push({
        id: component.id,
        instance: component,
        children: [],
      });
    }

    // NOTE: If server-side rendering, skip dom creation and CSS attachment.
    if (component.parent && component.parent.ssrTree) {
      const html = component.renderToHTML(component.parent.ssrTree);
      return html.wrapped;
    }

    const dom = component.renderToDOM({ includeActual: true });
    const html = component.renderToHTML();

    component.dom = dom;

    component.handleAttachCSS();
    component.handleAttachEvents(component.parent);

    Component.instance = component;

    return html.wrapped;
  } catch (exception) {
    console.log(exception);
  }
};

const each = function each(items, callback) {
  return items
    .map((item) => {
      return callback(item);
    })
    .join("\n");
};

const i18n = function i18n(key = "", replacements = {}) {
  const translations =
    typeof window !== "undefined"
      ? window.__joystick_i18n__
      : this.translations;

  if (translations && translations[key]) {
    return Object.entries(replacements).length > 0
      ? Object.entries(replacements).reduce(
          (translation, [replacementKey, replacementValue]) => {
            return translation.replace(
              `{{${replacementKey}}}`,
              replacementValue
            );
          },
          translations[key]
        )
      : translations[key];
  }

  return "";
};

const when = function when(test = false, toRender = "") {
  if (test) {
    return toRender;
  }

  return "";
};

export default {
  c: component,
  component,
  e: each,
  each,
  i: i18n,
  i18n,
  w: when,
  when,
};
