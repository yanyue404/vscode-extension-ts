// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("hello-world.helloWorld", () => {
    // The code you want to run when your command is executed

    vscode.window.showInformationMessage("Hello World!");
  });

  context.subscriptions.push(disposable);
}
// This method is called when your extension is deactivated
export function deactivate() {}
