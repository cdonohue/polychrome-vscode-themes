const { commands, window, workspace } = require("vscode")
const generateTheme = require("./generateTheme")
const path = require("path")
const fse = require("fs-extra")
const { isEqual } = require("lodash")

const darkThemePath = path.join(
  __dirname,
  "themes",
  "polychrome-dark-color-theme.json"
)

const lightThemePath = path.join(
  __dirname,
  "themes",
  "polychrome-light-color-theme.json"
)

async function updateTheme(config, isDarkTheme = true) {
  const { accent, background, primary } = config

  const theme = generateTheme(accent, background, primary)

  const themePath = isDarkTheme ? darkThemePath : lightThemePath

  await fse.remove(themePath)
  await fse.writeFile(themePath, theme)
}

async function verifyThemes() {
  const darkConfig = workspace.getConfiguration("polychrome.dark")
  const lightConfig = workspace.getConfiguration("polychrome.light")

  const generatedDarkTheme = JSON.parse(
    generateTheme(darkConfig.accent, darkConfig.background, darkConfig.primary)
  )
  const generatedLightTheme = JSON.parse(
    generateTheme(
      lightConfig.accent,
      lightConfig.background,
      lightConfig.primary
    )
  )

  const darkTheme = (await fse.exists(darkThemePath))
    ? require(darkThemePath)
    : {}
  const lightTheme = (await fse.exists(lightThemePath))
    ? require(lightThemePath)
    : {}

  // Check to see if the user's settings generate a theme that matches the local theme files
  if (
    !isEqual(darkTheme, generatedDarkTheme) ||
    !isEqual(lightTheme, generatedLightTheme)
  ) {
    updateAllThemes()
    promptForReload(
      "Polychrome has detected some changes and needs to regenerate your themes. Please reload the window for these changes to take effect."
    )
  }
}

function promptForReload(
  message = "Please reload the window in order for your theme changes to take effect for Polychrome"
) {
  const action = "Reload"

  window.showInformationMessage(message, action).then((selectedAction) => {
    if (selectedAction === action) {
      commands.executeCommand("workbench.action.reloadWindow")
    }
  })
}

function updateAllThemes() {
  const darkConfig = workspace.getConfiguration("polychrome.dark")
  updateTheme(darkConfig)
  const lightConfig = workspace.getConfiguration("polychrome.light")
  updateTheme(lightConfig, false)
}

function activate(context) {
  verifyThemes()

  const commandRegistration = commands.registerCommand(
    "polychrome.generateThemes",
    () => {
      updateAllThemes()
      promptForReload()
    }
  )

  const configRegistration = workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration("polychrome")) {
      if (e.affectsConfiguration("polychrome.dark")) {
        const darkConfig = workspace.getConfiguration("polychrome.dark")
        updateTheme(darkConfig)
      }
      if (e.affectsConfiguration("polychrome.light")) {
        const lightConfig = workspace.getConfiguration("polychrome.light")
        updateTheme(lightConfig, false)
      }

      promptForReload()
    }
  })

  context.subscriptions.push(commandRegistration, configRegistration)
}

exports.activate = activate

function deactivate() {}
exports.deactivate = deactivate
