#!/usr/bin/env node

const vscode = require("vscode");
const { updateTheme } = require("./extension");

const darkConfig = vscode.workspace.getConfiguration("polychrome.dark");
updateTheme(darkConfig);
const lightConfig = vscode.workspace.getConfiguration("polychrome.light");
updateTheme(lightConfig, false);