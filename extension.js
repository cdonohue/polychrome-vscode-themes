const vscode = require("vscode");
const generateTheme = require("./generateTheme");
const path = require("path");
const fse = require("fs-extra");

const darkThemePath = path.join(
  __dirname,
  "themes",
  "polychrome-dark-color-theme.json"
);

const lightThemePath = path.join(
  __dirname,
  "themes",
  "polychrome-light-color-theme.json"
);

async function updateTheme(config, isDarkTheme = true) {
  const { accent, background, primary } = config;

  const theme = generateTheme(accent, background, primary);

  const themePath = isDarkTheme ? darkThemePath : lightThemePath;

  await fse.remove(themePath);
  await fse.writeFile(themePath, theme);
}

function activate(context) {
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration("polychrome")) {
        const updatedThemes = [];
        if (e.affectsConfiguration("polychrome.dark")) {
          const darkConfig = vscode.workspace.getConfiguration("polychrome.dark");
          updateTheme(darkConfig);

          updatedThemes.push("Polychrome Dark")
        }
        if (e.affectsConfiguration("polychrome.light")) {
          const lightConfig = vscode.workspace.getConfiguration("polychrome.light");
          updateTheme(lightConfig, false);

          updatedThemes.push("Polychrome Light")
        }

        const action = "Reload";
        vscode.window.showInformationMessage(
          `Reload window in order for changes to take effect for the following themes: 
          ${updatedThemes.join(", ")}`,
          action
        ).then(selectedAction => {
          if (selectedAction === action) {
            vscode.commands.executeCommand("workbench.action.reloadWindow");
          }
        });
      }
    })
  )
}

exports.activate = activate;

function deactivate() { }
exports.deactivate = deactivate;
