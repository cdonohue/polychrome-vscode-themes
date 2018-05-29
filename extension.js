const { commands, window, workspace } = require("vscode")
const generateTheme = require("./generateTheme")
const path = require("path")
const fse = require("fs-extra")

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

const darkTheme = require(darkThemePath)
const lightTheme = require(lightThemePath)

async function updateTheme(config, isDarkTheme = true) {
  const { accent, background, primary } = config

  const theme = generateTheme(accent, background, primary)

  const themePath = isDarkTheme ? darkThemePath : lightThemePath

  await fse.remove(themePath)
  await fse.writeFile(themePath, theme)
}

function checkThemeAgainstSettings() {
  const darkConfig = workspace.getConfiguration("polychrome.dark")
  const lightConfig = workspace.getConfiguration("polychrome.light")

  if (
    darkConfig.background !== darkTheme.polychromeConfig.background ||
    darkConfig.primary !== darkTheme.polychromeConfig.primary ||
    darkConfig.accent !== darkTheme.polychromeConfig.accent ||
    lightConfig.background !== lightTheme.polychromeConfig.background ||
    lightConfig.primary !== lightTheme.polychromeConfig.primary ||
    lightConfig.accent !== lightTheme.polychromeConfig.accent
  ) {
    updateAllThemes()
    promptForReload()
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
  checkThemeAgainstSettings()

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
