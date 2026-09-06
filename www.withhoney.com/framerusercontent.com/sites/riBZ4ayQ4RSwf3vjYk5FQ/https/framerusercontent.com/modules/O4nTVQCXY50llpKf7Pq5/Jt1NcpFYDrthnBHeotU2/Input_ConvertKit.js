import { jsx as _jsx } from "react/jsx-runtime";
import Input from "https://framer.com/m/framer/InputSites.js@1.16.4";
import { ControlType, addPropertyControls } from "framer";
/**
 * INPUT - CONVERTKIT
 * By Benjamin den Boer
 *
 * @framerDisableUnlink
 *
 * @framerIntrinsicWidth 300
 * @framerIntrinsicHeight 40
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight any
 */ export default function ConvertKit(props) {
  // This is a React component containing an Example component
  // - Replace <Example /> with your own code
  // - Find inspiration: https://www.framer.com/developers/
  return /*#__PURE__*/ _jsx(Input, { ...props, service: "convertkit" });
}
addPropertyControls(ConvertKit, {
  convertkitAPI: {
    title: "API Key",
    placeholder: "5opis1WK6xnVsBwrOINUpe",
    type: ControlType.String,
  },
  convertkitFormID: {
    title: "Form ID",
    placeholder: "1043389",
    type: ControlType.String,
  },
  link: {
    title: "Redirect",
    type: ControlType.Link,
    hidden: (props) => props.redirectAs === "overlay",
  },
  onSubmit: {
    title: "Submit",
    type: ControlType.EventHandler,
    hidden: (props) => props.redirectAs === "link",
  },
  trackingId: {
    title: "Tracking",
    placeholder: "ID",
    type: ControlType.TrackingId,
  },
  layout: {
    title: "Layout",
    type: ControlType.Enum,
    options: ["horizontal", "vertical"],
    displaySegmentedControl: true,
    hidden: (props) => props.button.isDocked,
  },
  font: { type: ControlType.Font, title: "Font", controls: "extended" },
  input: {
    title: "Input",
    type: ControlType.Object,
    controls: {
      placeholder: {
        title: "Placeholder",
        type: ControlType.String,
        defaultValue: "name@email.com",
      },
      placeholderColor: {
        title: " ",
        type: ControlType.Color,
        defaultValue: "rgba(0, 0, 0, 0.3)",
      },
      fill: { title: "Fill", type: ControlType.Color, defaultValue: "#EBEBEB" },
      color: { title: "Text", type: ControlType.Color, defaultValue: "#000" },
      height: {
        title: "Height",
        type: ControlType.Boolean,
        enabledTitle: "Auto",
        disabledTitle: "Fixed",
      },
      fixedHeight: {
        title: " ",
        type: ControlType.Number,
        displayStepper: true,
        min: 0,
        defaultValue: 50,
        hidden: (props) => props.height,
      },
      padding: {
        title: "Padding",
        type: ControlType.FusedNumber,
        toggleKey: "paddingPerSide",
        toggleTitles: ["Padding", "Padding per side"],
        defaultValue: 15,
        valueKeys: [
          "paddingTop",
          "paddingRight",
          "paddingBottom",
          "paddingLeft",
        ],
        valueLabels: ["T", "R", "B", "L"],
        min: 0,
      },
      borderRadius: {
        title: "Radius",
        type: ControlType.Number,
        displayStepper: true,
        min: 0,
        defaultValue: 8,
      },
      focusObject: {
        type: ControlType.Object,
        title: "Focus",
        optional: true,
        controls: {
          focusWidthFrom: {
            title: "From",
            type: ControlType.Number,
            displayStepper: true,
            defaultValue: 0,
          },
          focusWidthTo: {
            title: "To",
            type: ControlType.Number,
            displayStepper: true,
            defaultValue: 2,
          },
          focusColor: {
            title: "Color",
            type: ControlType.Color,
            defaultValue: "#09F",
          },
        },
      },
      borderObject: {
        type: ControlType.Object,
        title: "Border",
        optional: true,
        controls: {
          borderWidth: {
            title: "Width",
            type: ControlType.Number,
            displayStepper: true,
            defaultValue: 1,
          },
          borderColor: {
            title: "Color",
            type: ControlType.Color,
            defaultValue: "rgba(200,200,200,0.5)",
          },
        },
      },
      shadowObject: {
        type: ControlType.Object,
        title: "Shadow",
        optional: true,
        controls: {
          shadowColor: {
            title: "Color",
            type: ControlType.Color,
            defaultValue: "rgba(0,0,0,0.25)",
          },
          shadowX: {
            title: "Shadow X",
            type: ControlType.Number,
            min: -100,
            max: 100,
            defaultValue: 0,
          },
          shadowY: {
            title: "Shadow Y",
            type: ControlType.Number,
            min: -100,
            max: 100,
            defaultValue: 2,
          },
          shadowBlur: {
            title: "Shadow B",
            type: ControlType.Number,
            min: 0,
            max: 100,
            defaultValue: 4,
          },
        },
      },
    },
  },
  button: {
    title: "Button",
    type: ControlType.Object,
    controls: {
      shouldAppear: {
        title: "Show",
        type: ControlType.Boolean,
        defaultValue: true,
      },
      label: {
        title: "Label",
        type: ControlType.String,
        defaultValue: "Subscribe",
      },
      buttonFont: {
        type: ControlType.Font,
        title: "Font",
        controls: "extended",
      },
      fill: { title: "Fill", type: ControlType.Color, defaultValue: "#333" },
      color: { title: "Text", type: ControlType.Color, defaultValue: "#FFF" },
      isDocked: {
        title: "Docked",
        type: ControlType.Boolean,
        defaultValue: false,
      },
      widthWhenDocked: {
        title: "Width",
        type: ControlType.Number,
        min: 0,
        defaultValue: 100,
        displayStepper: true,
        hidden: (props) => !props.isDocked,
      },
      insetWhenDocked: {
        title: "Inset",
        type: ControlType.Number,
        min: 0,
        defaultValue: 5,
        displayStepper: true,
        hidden: (props) => !props.isDocked,
      },
      buttonPadding: {
        title: "Padding",
        type: ControlType.FusedNumber,
        toggleKey: "buttonPaddingPerSide",
        toggleTitles: ["Padding", "Padding per side"],
        defaultValue: 15,
        valueKeys: [
          "buttonPaddingTop",
          "buttonPaddingRight",
          "buttonPaddingBottom",
          "buttonPaddingLeft",
        ],
        valueLabels: ["T", "R", "B", "L"],
        min: 0,
      },
      buttonShadow: {
        type: ControlType.Object,
        title: "Shadow",
        optional: true,
        controls: {
          shadowColor: {
            title: "Color",
            type: ControlType.Color,
            defaultValue: "rgba(0,0,0,0.25)",
          },
          shadowX: {
            title: "Shadow X",
            type: ControlType.Number,
            min: -100,
            max: 100,
            defaultValue: 0,
          },
          shadowY: {
            title: "Shadow Y",
            type: ControlType.Number,
            min: -100,
            max: 100,
            defaultValue: 2,
          },
          shadowBlur: {
            title: "Shadow B",
            type: ControlType.Number,
            min: 0,
            max: 100,
            defaultValue: 4,
          },
        },
      },
    },
  },
  gap: {
    title: "Gap",
    type: ControlType.Number,
    displayStepper: true,
    min: 0,
    defaultValue: 10,
    hidden: (props) => props.button.isDocked,
  },
});
export const __FramerMetadata__ = {
  exports: {
    default: {
      type: "reactComponent",
      name: "ConvertKit",
      slots: [],
      annotations: {
        framerDisableUnlink: "*",
        framerContractVersion: "1",
        framerSupportedLayoutWidth: "fixed",
        framerIntrinsicWidth: "300",
        framerIntrinsicHeight: "40",
        framerSupportedLayoutHeight: "any",
      },
    },
    __FramerMetadata__: { type: "variable" },
  },
};
//# sourceMappingURL=./Input_ConvertKit.map
