import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {
  // 注册 Hello 消息
  const helloCommand = vscode.commands.registerCommand("yanyue.sayHello", () => {
    vscode.window.showInformationMessage("Hello World!");
  });
  // 创建笔记文件的命令
  const createNoteCommand = vscode.commands.registerCommand("yanyue.createAndOpenNote", async () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage("No workspace folder found. Please open a workspace first.");
      return;
    }
    // 定义笔记文件的路径和名称

    const noteName = await vscode.window.showInputBox({ prompt: "Enter note name" });
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
      today.getDate()
    ).padStart(2, "0")}`;
    const noteFilePath = path.join(workspaceFolders[0].uri.fsPath, `QuickNote_${formattedDate}_${noteName}.md`);
    if (noteName) {
      // 创建笔记文件
      const noteFileUri = vscode.Uri.file(noteFilePath);
      await vscode.workspace.fs.writeFile(noteFileUri, Buffer.from(`# ${noteName}`, "utf8"));

      // 在编辑器中打开笔记文件
      const document = await vscode.workspace.openTextDocument(noteFileUri);
      await vscode.window.showTextDocument(document);

      // 执行编辑器听写命令
      await vscode.commands.executeCommand("workbench.action.editorDictation.start");
    }
  });

  context.subscriptions.push(helloCommand, createNoteCommand);
}

export function deactivate() {}
