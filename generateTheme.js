const fs = require("fs");
const path = require("path");
const color = require("polychrome");

module.exports = function generateTheme(
  accentColor,
  backgroundColor,
  primaryColor
) {
  const primary = color(primaryColor);
  const accent = color(accentColor);
  const background = color(backgroundColor);

  const isDarkBg = background.isDark()
  const bgContrast = background.contrast()

  // Mix
  const primaryHigh = primary.mix(bgContrast)
  const primaryLow = isDarkBg ? primary.mix(background).darken(30) : primary.mix(background).lighten()

  const accentLow = isDarkBg ? accent
    .mix(background)
    .setSaturation(10)
    .darken(15) : accent
      .mix(background)
      .setSaturation(10)
      .lighten();

  const [
    primary1,
    primary2,
    primary3,
    primary4,
    primary5,
    accent1,
    accent2,
    accent3
  ] = [
    primaryHigh,
    primaryHigh.mix(primary),
    primary,
    primary.mix(primaryLow),
    primaryLow,
    accent,
    accent.mix(accentLow),
    accentLow
  ].map(color => color.hex());

  const editorBg = background.hex();
  const uiBg = background.darken(17).hex();
  const uiBgContrast = color(uiBg).contrast();
  const uiBorder = background.darken(33).hex();
  const bgHighlight = isDarkBg ? background.lighten(3).hex() : background.darken(3).hex();
  const lineHighlight = isDarkBg ? background.lighten(20).hex() : background.darken(20).hex();

  const mutedText = uiBgContrast.setLightness(65).hex();

  const foreground = uiBgContrast.setLightness(isDarkBg ? 75 : 25).hex();

  const indentGuide = isDarkBg ? background.lighten(20).hex() : background.darken(10).hex();
  const selection = isDarkBg ? background.lighten(30).hex() : background.darken(10).hex();

  const orange = color("#E6C08B");
  const red = color("#CD5C5C");
  const blue = color("#87CEFA");
  const green = color("#5ACD8F");

  const theme = `{
    "name": "Polychrome ${isDarkBg ? "Dark" : "Light"}",
    "type": "${isDarkBg ? "dark" : "light"}",
    "colors": {
      /* Contrast Colors */
      "contrastActiveBorder": "#00000000",
      "contrastBorder": "${uiBorder}00",
      /* Base Colors */
      "focusBorder": "#00000000",
      "foreground": "${foreground}",
      "widget.shadow": "${uiBorder}",
      "selection.background": "${selection}",
      "descriptionForeground": "${mutedText}",
      "errorForeground": "${red.hex()}",
      /* Text Colors */
      "textBlockQuote.background": "${bgHighlight}",
      "textBlockQuote.border": "${primary5}",
      // "textCodeBlock.background": "#ff0000",
      "textLink.activeForeground": "${bgContrast.hex()}",
      "textLink.foreground": "${primary3}",
      "textPreformat.foreground": "${accent2}",
      // "textSeparator.foreground": "#ff0000",
      /* Button Control */
      "button.background": "${primary5}",
      "button.foreground": "${bgContrast.hex()}",
      "button.hoverBackground": "${primary4}",
      /* Dropdown Control */
      "dropdown.background": "${editorBg}",
      "dropdown.border": "${primary5}",
      "dropdown.foreground": "${foreground}",
      // "dropdown.listBackground": "#ff0000",
      /* Input Control */
      "input.background": "${bgHighlight}",
      "input.border": "${primary5}",
      "input.foreground": "${bgContrast.hex()}",
      "input.placeholderForeground": "${primary5}",
      "inputOption.activeBorder": "${primary4}",
      "inputValidation.errorBackground": "#392A31",
      "inputValidation.errorBorder": "#CD5C5C",
      // "inputValidation.infoBackground": "#ff0000",
      // "inputValidation.infoBorder": "#ff0000",
      // "inputValidation.warningBackground": "#ff0000",
      // "inputValidation.warningBorder": "#ff0000",
      /* Scroll Bar Control */
      "scrollbar.shadow": "#00000000",
      "scrollbarSlider.activeBackground": "${primary5}",
      "scrollbarSlider.background": "${color(primary5)
      .darken()
      .hex()}",
      "scrollbarSlider.hoverBackground": "${primary5}",
      /* Badge */
      "badge.foreground": "${color(primary3)
      .contrast()
      .hex()}",
      "badge.background": "${primary3}",
      /* Progress Bar */
      "progressBar.background": "${primary3}",
      /* Lists and Trees */
      "list.activeSelectionBackground": "${bgHighlight}",
      "list.inactiveSelectionBackground": "${bgHighlight}",
      "list.activeSelectionForeground": "${bgContrast.hex()}",
      "list.dropBackground": "${editorBg}",
      "list.focusBackground": "${bgHighlight}",
      "list.focusForeground": "${bgContrast.hex()}",
      "list.highlightForeground": "${primary2}",
      "list.hoverBackground": "${bgHighlight}",
      "list.hoverForeground": "${foreground}",
      "list.inactiveSelectionForeground": "${bgContrast.hex()}",
      /* Activity Bar */
      "activityBar.background": "${uiBg}",
      "activityBar.border": "${uiBorder}",
      "activityBar.dropBackground": "${editorBg}",
      "activityBar.foreground": "${mutedText}",
      "activityBarBadge.background": "${primary3}",
      "activityBarBadge.foreground": "${color(primary3)
      .contrast()
      .hex()}",
      /* Side Bar */
      "sideBar.background": "${uiBg}",
      "sideBar.foreground": "${mutedText}",
      "sideBar.dropBackground": "${editorBg}",
      "sideBarSectionHeader.foreground": "${primary1}",
      "sideBarTitle.foreground": "${primary1}",
      "sideBarSectionHeader.background": "#0000",
      "sideBar.border": "${uiBorder}",
      /* Editor Groups and Tabs */
      "editorGroup.background": "${uiBg}",
      "editorGroup.dropBackground": "${bgHighlight}",
      "editorGroupHeader.noTabsBackground": "${uiBg}",
      "editorGroupHeader.tabsBorder": "${editorBg}",
      "editorGroupHeader.tabsBackground": "${uiBg}",
      "editorGroup.border": "${uiBorder}",
      "tab.activeBackground": "${editorBg}",
      "tab.inactiveForeground": "${mutedText}",
      "tab.unfocusedInactiveForeground": "${mutedText}",
      "tab.border": "${uiBorder}",
      "tab.activeBorder": "${editorBg}",
      "tab.activeForeground": "${color(editorBg).contrast().hex()}",
      "tab.hoverBackground": "${editorBg}",
      "tab.hoverBorder": "${editorBg}",
      "tab.unfocusedActiveBorder": "${editorBg}",
      "tab.unfocusedActiveForeground": "${mutedText}",
      "tab.unfocusedHoverBackground": "${editorBg}",
      "tab.unfocusedHoverBorder": "${editorBg}",
      "tab.inactiveBackground": "${uiBg}",
      /* Editor Colors */
      "editor.background": "${editorBg}",
      "editor.foreground": "${primary2}",
      "editor.selectionBackground": "${selection}",
      "editor.inactiveSelectionBackground": "${selection}",
      "editor.selectionHighlightBackground": "${primary2}55",
      "editor.selectionHighlightBorder": "#0000",
      "editor.wordHighlightBackground": "${primary1}33",
      "editor.wordHighlightBorder": "#0000",
      "editor.wordHighlightStrongBackground": "${accent1}22",
      "editor.wordHighlightStrongBorder": "#0000",
      "editor.findMatchBackground": "${primary1}55",
      "editor.findMatchBorder": "#0000",
      "editor.findMatchHighlightBackground": "${primary1}22",
      "editor.findMatchHighlightBorder": "#0000",
      "editor.findRangeHighlightBackground": "${primary1}22",
      "editor.findRangeHighlightBorder": "#0000",
      "editor.hoverHighlightBackground": "${primary1}33",
      "editor.lineHighlightBackground": "${primary5}33",
      "editorLineNumber.foreground": "${color(primary5)
      .darken(1)
      .hex()}",
      "editorActiveLineNumber.foreground": "${primary4}",
      "editorCursor.foreground": "${accent1}",
      "editorWhitespace.foreground": "${color(primary5)
      .darken(10)
      .hex()}",
      "editorLink.activeForeground": "${primary1}",
      "editor.lineHighlightBorder": "#0000",
      "editor.rangeHighlightBackground": "${primary1}11",
      "editor.rangeHighlightBorder": "#0000", 
      "editorBracketMatch.background": "#0000",
      "editorBracketMatch.border": "${primary1}55",
      "editorIndentGuide.background": "${indentGuide}",
      "editorCodeLens.foreground": "${mutedText}",
      "editorError.foreground": "${red.hex()}",
      "editorError.border": "#0000",
      "editorWarning.foreground": "${orange.hex()}",
      "editorWarning.border": "#0000",
      "editorInfo.foreground": "${blue.hex()}",
      "editorInfo.border": "#0000",
      "editorGutter.modifiedBackground": "${accent2}",
      "editorGutter.addedBackground": "${primary2}",
      "editorGutter.deletedBackground": "${red.hex()}",
      // editorOverview
      /* Diff Editor Colors */
      "diffEditor.insertedTextBackground": "${green.hex()}26",
      "diffEditor.removedTextBackground": "${red.hex()}26",
      /* Editor Widget Colors */
      "editorWidget.background": "${background.lighten().hex()}",
      "editorWidget.border": "${primary4}",
      "editorSuggestWidget.background": "${uiBg}",
      "editorSuggestWidget.border": "${primary5}",
      "editorSuggestWidget.foreground": "${foreground}",
      "editorSuggestWidget.highlightForeground": "${primary2}",
      "editorSuggestWidget.selectedBackground": "${selection}",
      "editorHoverWidget.background": "${uiBg}",
      // debugException
      // editorMarkerNavigation
      /* Peek View Colors */
      "peekView.border": "${primary4}",
      "peekViewEditor.background": "${editorBg}",
      "peekViewEditor.matchHighlightBackground": "${accent2}44",
      "peekViewEditorGutter.background": "${editorBg}",
      "peekViewResult.background": "${uiBg}",
      "peekViewResult.selectionBackground": "${selection}",
      /* Merge Conflicts */
      /* Panel Colors */
      "panel.border": "${uiBorder}",
      "panel.background": "${editorBg}",
      "panel.dropBackground": "${uiBg}",
      "panelTitle.activeBorder": "${primary2}",
      "panelTitle.activeForeground": "${primary1}",
      "panelTitle.inactiveForeground": "${mutedText}",
      /* Status Bar Colors */
      "statusBar.background": "${uiBg}",
      "statusBar.border": "${uiBorder}",
      "statusBar.foreground": "${mutedText}",
      "statusBar.debuggingForeground": "${uiBg}",
      "statusBar.debuggingBackground": "${orange.hex()}",
      "statusBar.noFolderBackground": "${foreground}",
      "statusBar.noFolderForeground": "${uiBg}",
      /* Title Bar Colors */
      "titleBar.border": "${uiBorder}",
      "titleBar.activeBackground": "${uiBg}",
      /* Notification Dialog Colors */  
      "notificationCenter.border": "#0000",
      "notificationCenterHeader.foreground": "${primary1}",
      "notificationCenterHeader.background": "${uiBg}",
      "notificationToast.border": "#0000",
      "notifications.foreground": "${primary1}",
      "notifications.border": "${uiBorder}",
      "notifications.background": "${background.lighten().hex()}",
      "notificationLink.foreground": "${primary3}",
      /* Extensions */
      /* Quick Picker */
      /* Integrated Terminal Colors */
      "terminal.ansiBlack": "${primary5}",
      "terminal.ansiBlue": "${primary2}",
      "terminal.ansiCyan": "${primary4}",
      "terminal.ansiGreen": "${primary3}",
      "terminal.ansiMagenta": "${accent1}",
      "terminal.ansiRed": "${red.hex()}",
      "terminal.ansiWhite": "#f5f5f5",
      "terminal.ansiYellow": "${accent1}",
      "terminal.ansiBrightBlack": "${accent2}",
      "terminal.ansiBrightBlue": "${primary1}",
      "terminal.ansiBrightCyan": "${primary1}",
      "terminal.ansiBrightGreen": "${primary3}",
      "terminal.ansiBrightMagenta": "${accent2}",
      "terminal.ansiBrightRed": "${accent1}",
      "terminal.ansiBrightWhite": "${bgContrast.hex()}",
      "terminal.ansiBrightYellow": "${accent2}",
      /* Debug */
      "debugToolBar.background": "${selection}",
      /* Welcome Page */
      /* Git Colors */
      "gitDecoration.conflictingResourceForeground": "${red.hex()}",
      "gitDecoration.deletedResourceForeground": "${red.hex()}",
      "gitDecoration.ignoredResourceForeground": "${mutedText}77",
      "gitDecoration.modifiedResourceForeground": "${orange.hex()}",
      "gitDecoration.submoduleResourceForeground": "${blue.hex()}",
      "gitDecoration.untrackedResourceForeground": "${green.hex()}"
    },
    "tokenColors": [
      {
        "name": "Primary 1",
        "scope": [
          "entity.name.type",
          "support.type",
          "entity.name.function",
          "entity.name.tag",
          "entity.other.attribute-name.class",
          "entity.other.attribute-name.id",
          "support.function"
        ],
        "settings": {
          "foreground": "${primary1}"
        }
      },
      {
        "name": "Primary 2",
        "scope": [
          "support.other.variable",
          "entity.other.attribute-name",
          "support.class"
        ],
        "settings": {
          "foreground": "${primary2}"
        }
      },
      {
        "name": "Primary 3",
        "scope": [
          "variable.other.readwrite.alias",
          "meta.property-name",
          "support.type.property-name",
          "variable.language.this",
          "support.variable.property.dom.js",
          "variable"
        ],
        "settings": {
          "foreground": "${primary3}"
        }
      },
      {
        "name": "Primary 4",
        "scope": [
          "support.class.component.js",
          "support.variable.dom",
          "support.variable.object",
          "support.variable.property.process"
        ],
        "settings": {
          "foreground": "${primary4}"
        }
      },
      {
        "name": "Primary 5",
        "scope": [
          "meta.brace",
          "punctuation",
          "meta.property-value"
        ],
        "settings": {
          "foreground": "${primary5}"
        }
      },
      {
        "name": "Accent 1",
        "scope": [
          "string",
          "constant.numeric",
          "constant.language",
          "constant.character",
          "constant.other",
          "variable.other.constant",
          "support.constant",
          "meta.object-literal.key"
        ],
        "settings": {
          "foreground": "${accent1}"
        }
      },
      {
        "name": "Accent 2",
        "scope": [
          "keyword",
          "storage"
        ],
        "settings": {
          "foreground": "${accent2}"
        }
      },
      {
        "name": "Accent 3",
        "scope": [
          "comment.block.c"
        ],
        "settings": {
          "foreground": "${accent3}"
        }
      },
      // Special Cases for font styles
      {
        "name": "Comment",
        "scope": [
          "comment"
        ],
        "settings": {
          "foreground": "${primary5}",
          "fontStyle": "italic"
        }
      },
      {
        "name": "Comment in Params",
        "scope": "meta.parameters comment.block",
        "settings": {
          "foreground": "${accent3}",
          "fontStyle": "italic"
        }
      },
      {
        "name": "Storage type",
        "scope": "storage.type",
        "settings": {
          "fontStyle": "italic",
          "foreground": "${accent1}"
        }
      },
      {
        "name": "Class name",
        "scope": "entity.name.class",
        "settings": {
          "fontStyle": "underline",
          "foreground": "${primary1}"
        }
      },
      {
        "name": "Inherited class",
        "scope": "entity.other.inherited-class",
        "settings": {
          "fontStyle": "italic underline",
          "foreground": "${primary1}"
        }
      },
      {
        "name": "Function argument",
        "scope": "variable.parameter",
        "settings": {
          "fontStyle": "italic",
          "foreground": "${primary3}"
        }
      },
      {
        "name": "Invalid",
        "scope": "invalid",
        "settings": {
          "foreground": "#F8F8F0"
        }
      },
      {
        "name": "Invalid deprecated",
        "scope": "invalid.deprecated",
        "settings": {
          "foreground": "#F8F8F0"
        }
      },
      {
        "scope": "token.info-token",
        "settings": {
          "foreground": "#6796e6"
        }
      },
      {
        "scope": "token.warn-token",
        "settings": {
          "foreground": "#cd9731"
        }
      },
      {
        "scope": "token.error-token",
        "settings": {
          "foreground": "#f44747"
        }
      },
      {
        "scope": "token.debug-token",
        "settings": {
          "foreground": "#b267e6"
        }
      }
    ]
  }`;

  return theme;
};
