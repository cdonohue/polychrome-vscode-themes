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

async function updateTheme(config, isDarkTheme = true) {
  const { accent, background, primary } = config

  const theme = generateTheme(accent, background, primary)

  const themePath = isDarkTheme ? darkThemePath : lightThemePath

  await fse.remove(themePath)
  await fse.writeFile(themePath, theme)
}

function promptForReload() {
  const action = "Reload"

  window
    .showInformationMessage(
      "Reload window in order for changes to take effect for Polychrome",
      action
    )
    .then((selectedAction) => {
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
  const commandRegistration = commands.registerCommand(
    "polychrome.generateThemes",
    () => {
      updateAllThemes()
      promptForReload()
    }
  )

  const configRegistration = workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration("polychrome")) {
      const updatedThemes = []
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
