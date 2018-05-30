const color = require("polychrome")

module.exports = function generateTheme(
  accentColor,
  backgroundColor,
  primaryColor
) {
  const primary = color(primaryColor)
  const accent = color(accentColor)
  const background = color(backgroundColor)

  const isDarkBg = background.isDark()
  const bgContrast = background.contrast()

  const isPrimaryExtreme = primary.l === 100 || primary.l === 0

  // Mix
  const primaryHigh = isPrimaryExtreme ? primary : primary.mix(bgContrast)
  const primaryLow = isDarkBg
    ? primary.mix(background).darken(30)
    : primary.mix(background).lighten()
  const primaryMid = isPrimaryExtreme ? primaryHigh.mix(primaryLow) : primary

  const accentLow = isDarkBg
    ? accent
        .mix(background)
        .setSaturation(10)
        .darken(15)
    : accent
        .mix(background)
        .setSaturation(10)
        .lighten()

  const [
    primary1,
    primary2,
    primary3,
    primary4,
    primary5,
    accent1,
    accent2,
    accent3,
  ] = [
    primaryHigh,
    primaryHigh.mix(primaryMid),
    primaryMid,
    primaryMid.mix(primaryLow),
    primaryLow,
    accent,
    accent.mix(accentLow),
    accentLow,
  ].map((color) => color.hex())

  const editorBg = background.hex()
  const tabBg = isDarkBg
    ? background.darken(20).hex()
    : background.darken(5).hex()
  const sideBarBg = color(tabBg).hex()
  const sideBarHeaderBg = isDarkBg
    ? color(sideBarBg)
        .darken()
        .hex()
    : color(sideBarBg)
        .darken(5)
        .hex()
  const activityBarBg = isDarkBg
    ? color(sideBarHeaderBg)
        .darken()
        .hex()
    : color(sideBarHeaderBg)
        .darken(5)
        .hex()
  const titleBarBg = isDarkBg
    ? color(activityBarBg)
        .darken()
        .hex()
    : color(activityBarBg)
        .darken(5)
        .hex()
  const panelBg = background.lighten().hex()

  const uiBg = isDarkBg
    ? background.darken(20).hex()
    : background.darken(5).hex()
  const uiBgContrast = color(uiBg).contrast()
  const uiBorder = activityBarBg
  const bgHighlight = isDarkBg
    ? background.lighten().hex()
    : background.darken().hex()
  const lineHighlight = isDarkBg
    ? background.lighten(32).hex()
    : background.darken(8).hex()

  const foreground = isDarkBg
    ? uiBgContrast.darken().hex()
    : uiBgContrast.lighten().hex()

  const mutedText = isDarkBg
    ? color(foreground)
        .setLightness(60)
        .hex()
    : color(foreground)
        .setLightness(40)
        .hex()

  const indentGuide = isDarkBg
    ? background.lighten(20).hex()
    : background.darken(10).hex()

  const indentHighlight = isDarkBg
    ? background.lighten(40).hex()
    : background.darken(20).hex()

  const selection = isDarkBg
    ? background.lighten(30).hex()
    : background.darken(10).hex()

  const orange = isDarkBg ? color("#e2c08d") : color("#d5880b")
  const red = isDarkBg ? color("#ff6347") : color("#f42a2a")
  const blue = isDarkBg ? color("#6494ed") : color("#1492ff")
  const green = isDarkBg ? color("#73c990") : color("#2db448")

  const gitAdded = green.hex()
  const gitModified = orange.hex()
  const gitRemoved = red.hex()

  const theme = `{
    "polychromeConfig": {
      "background": "${backgroundColor}",
      "primary": "${primaryColor}",
      "accent": "${accentColor}"
    },
    "name": "Polychrome ${isDarkBg ? "Dark" : "Light"}",
    "type": "${isDarkBg ? "dark" : "light"}",
    "colors": {
      "contrastActiveBorder": "#00000000",
      "contrastBorder": "${uiBgContrast.hex()}11",
      "focusBorder": "#00000000",
      "foreground": "${foreground}",
      "widget.shadow": "#0004",
      "selection.background": "${selection}",
      "descriptionForeground": "${mutedText}",
      "errorForeground": "${red.hex()}",
      "textBlockQuote.background": "${bgHighlight}",
      "textBlockQuote.border": "${primary5}",
      "textLink.activeForeground": "${bgContrast.hex()}",
      "textLink.foreground": "${primary3}",
      "textPreformat.foreground": "${accent2}",
      "button.background": "${primary5}",
      "button.foreground": "${bgContrast.hex()}",
      "button.hoverBackground": "${primary4}",
      "dropdown.background": "${editorBg}",
      "dropdown.border": "${bgContrast.hex()}22",
      "dropdown.foreground": "${foreground}",
      "input.background": "${bgHighlight}",
      "input.border": "${bgContrast.hex()}22",
      "input.foreground": "${bgContrast.hex()}",
      "input.placeholderForeground": "${bgContrast.hex()}44",
      "inputOption.activeBorder": "${primary4}",
      "inputValidation.errorBackground": "#392A31",
      "inputValidation.errorBorder": "#CD5C5C",
      "scrollbar.shadow": "#00000000",
      "scrollbarSlider.activeBackground": "${bgContrast.hex()}55",
      "scrollbarSlider.background": "${bgContrast.hex()}11",
      "scrollbarSlider.hoverBackground": "${bgContrast.hex()}33",
      "badge.foreground": "${color(primary3)
        .contrast()
        .hex()}",
      "badge.background": "${primary3}",
      "progressBar.background": "${primary3}",
      "list.activeSelectionBackground": "${editorBg}",
      "list.inactiveSelectionBackground": "${editorBg}",
      "list.activeSelectionForeground": "${bgContrast.hex()}",
      "list.dropBackground": "${editorBg}",
      "list.focusBackground": "${bgHighlight}",
      "list.focusForeground": "${bgContrast.hex()}",
      "list.highlightForeground": "${primary2}",
      "list.hoverBackground": "${bgHighlight}",
      "list.hoverForeground": "${foreground}",
      "list.inactiveSelectionForeground": "${bgContrast.hex()}",
      "activityBar.background": "${activityBarBg}",
      "activityBar.border": "${uiBgContrast.hex()}11",
      "activityBar.dropBackground": "${editorBg}",
      "activityBar.foreground": "${mutedText}",
      "activityBarBadge.background": "${primary3}",
      "activityBarBadge.foreground": "${color(primary3)
        .contrast()
        .hex()}",
      "sideBar.background": "${sideBarBg}",
      "sideBar.foreground": "${mutedText}",
      "sideBar.dropBackground": "${editorBg}",
      "sideBarSectionHeader.foreground": "${bgContrast.hex()}aa",
      "sideBarTitle.foreground": "${bgContrast.hex()}aa",
      "sideBarSectionHeader.background": "${sideBarHeaderBg}00",
      "sideBar.border": "${uiBorder}",
      "editorGroup.background": "${sideBarBg}",
      "editorGroup.dropBackground": "${bgHighlight}",
      "editorGroupHeader.noTabsBackground": "${sideBarBg}",
      "editorGroupHeader.tabsBorder": "${editorBg}",
      "editorGroupHeader.tabsBackground": "${sideBarBg}",
      "editorGroup.border": "${uiBorder}",
      "tab.activeBackground": "${editorBg}",
      "tab.inactiveForeground": "${mutedText}",
      "tab.unfocusedInactiveForeground": "${mutedText}",
      "tab.border": "${uiBorder}",
      "tab.activeBorder": "${editorBg}",
      "tab.activeForeground": "${color(editorBg)
        .contrast()
        .hex()}",
      "tab.hoverBackground": "${color(editorBg)
        .lighten()
        .hex()}",
      "tab.hoverBorder": "${editorBg}",
      "tab.unfocusedActiveBorder": "${editorBg}",
      "tab.unfocusedActiveForeground": "${mutedText}",
      "tab.unfocusedHoverBackground": "${editorBg}",
      "tab.unfocusedHoverBorder": "${editorBg}",
      "tab.inactiveBackground": "${tabBg}",
      "editor.background": "${editorBg}",
      "editor.foreground": "${primary2}",
      "editor.selectionBackground": "${selection}cc",
      "editor.inactiveSelectionBackground": "${selection}cc",
      "editor.selectionHighlightBackground": "${selection}99",
      "editor.selectionHighlightBorder": "#0000",
      "editor.wordHighlightBackground": "${selection}cc",
      "editor.wordHighlightBorder": "#0000",
      "editor.wordHighlightStrongBackground": "${selection}",
      "editor.wordHighlightStrongBorder": "#0000",
      "editor.findMatchBackground": "${primary1}55",
      "editor.findMatchBorder": "#0000",
      "editor.findMatchHighlightBackground": "${primary1}22",
      "editor.findMatchHighlightBorder": "#0000",
      "editor.findRangeHighlightBackground": "${primary1}22",
      "editor.findRangeHighlightBorder": "#0000",
      "editor.hoverHighlightBackground": "${primary1}33",
      "editor.lineHighlightBackground": "${lineHighlight}77",
      "editorLineNumber.foreground": "${color(primary5)
        .darken(1)
        .hex()}",
      "editorLineNumber.activeForeground": "${primary4}",
      "editorCursor.foreground": "${accent1}",
      "editorWhitespace.foreground": "${color(primary5)
        .darken(10)
        .hex()}",
      "editorIndentGuide.activeBackground": "${indentHighlight}",
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
      "editorGutter.modifiedBackground": "${orange.hex()}",
      "editorGutter.addedBackground": "${green.hex()}",
      "editorGutter.deletedBackground": "${red.hex()}",
      "diffEditor.insertedTextBackground": "${green.hex()}26",
      "diffEditor.removedTextBackground": "${red.hex()}26",
      "editorWidget.background": "${background.lighten().hex()}",
      "editorWidget.border": "${primary4}",
      "editorSuggestWidget.background": "${uiBg}",
      "editorSuggestWidget.border": "${primary5}",
      "editorSuggestWidget.foreground": "${foreground}",
      "editorSuggestWidget.highlightForeground": "${primary2}",
      "editorSuggestWidget.selectedBackground": "${selection}",
      "editorHoverWidget.background": "${uiBg}",
      "peekView.border": "${primary4}",
      "peekViewEditor.background": "${editorBg}",
      "peekViewEditor.matchHighlightBackground": "${accent2}44",
      "peekViewEditorGutter.background": "${editorBg}",
      "peekViewResult.background": "${uiBg}",
      "peekViewResult.selectionBackground": "${selection}",
      "panel.border": "${uiBorder}",
      "panel.background": "${panelBg}",
      "panel.dropBackground": "${editorBg}",
      "panelTitle.activeBorder": "${primary2}",
      "panelTitle.activeForeground": "${primary1}",
      "panelTitle.inactiveForeground": "${mutedText}",
      "statusBar.background": "${titleBarBg}",
      "statusBar.border": "#00000000",
      "statusBar.foreground": "${mutedText}",
      "statusBar.debuggingForeground": "${color(accent1)
        .contrast()
        .hex()}",
      "statusBar.debuggingBackground": "${accent1}",
      "statusBar.noFolderBackground": "${primary3}",
      "statusBar.noFolderForeground": "${color(primary3)
        .contrast()
        .hex()}",
      "titleBar.border": "#00000000",
      "titleBar.activeBackground": "${titleBarBg}", 
      "notificationCenter.border": "#0000",
      "notificationCenterHeader.foreground": "${primary1}",
      "notificationCenterHeader.background": "${activityBarBg}",
      "notificationToast.border": "#0000",
      "notifications.foreground": "${primary1}",
      "notifications.border": "${uiBorder}",
      "notifications.background": "${sideBarBg}",
      "notificationLink.foreground": "${primary3}",
      "extensionButton.prominentBackground": "${primary5}",
      "extensionButton.prominentForeground": "${color(primary5)
        .contrast()
        .hex()}",
      "extensionButton.prominentHoverBackground": "${primary4}",
      "terminal.ansiBlack": "${primary5}",
      "terminal.ansiBlue": "${primary2}",
      "terminal.ansiCyan": "${primary4}",
      "terminal.ansiGreen": "${primary3}",
      "terminal.ansiMagenta": "${accent1}",
      "terminal.ansiRed": "${red.hex()}",
      "terminal.ansiWhite": "${bgContrast.hex()}",
      "terminal.ansiYellow": "${accent1}",
      "terminal.ansiBrightBlack": "${accent2}",
      "terminal.ansiBrightBlue": "${primary1}",
      "terminal.ansiBrightCyan": "${primary1}",
      "terminal.ansiBrightGreen": "${primary3}",
      "terminal.ansiBrightMagenta": "${accent2}",
      "terminal.ansiBrightRed": "${accent1}",
      "terminal.ansiBrightWhite": "${bgContrast.hex()}",
      "terminal.ansiBrightYellow": "${accent2}",
      "debugToolBar.background": "${selection}",
      "gitDecoration.conflictingResourceForeground": "${red.hex()}",
      "gitDecoration.deletedResourceForeground": "${gitRemoved}",
      "gitDecoration.ignoredResourceForeground": "${mutedText}77",
      "gitDecoration.modifiedResourceForeground": "${gitModified}",
      "gitDecoration.submoduleResourceForeground": "${blue.hex()}",
      "gitDecoration.untrackedResourceForeground": "${gitAdded}"
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
          "variable.parameter",
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
          "meta.object-literal.key",
          "storage.type"
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
          "comment.block.c",
          "meta.parameters comment.block"
        ],
        "settings": {
          "foreground": "${accent3}"
        }
      },
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
        "name": "Class name",
        "scope": [
          "entity.name.class",
          "entity.other.inherited-class"
        ],
        "settings": {
          "fontStyle": "underline",
          "foreground": "${primary1}"
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
          "foreground": "${blue.hex()}"
        }
      },
      {
        "scope": "token.warn-token",
        "settings": {
          "foreground": "${orange.hex()}"
        }
      },
      {
        "scope": "token.error-token",
        "settings": {
          "foreground": "${red.hex()}"
        }
      },
      {
        "scope": "token.debug-token",
        "settings": {
          "foreground": "#b267e6"
        }
      }
    ]
  }`

  return theme
}
