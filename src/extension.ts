import * as vscode from "vscode";
import * as moment from "moment";

function message() {
  const days = moment().diff(moment("2021-03-10"), "days");
  const hint = vscode.workspace
    .getConfiguration("c20210310")
    .get<string>("hint")!;
  return hint.replace("$days", days + "");
}

export function activate({ subscriptions }: vscode.ExtensionContext) {
  const bar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  subscriptions.push(bar);

  function update() {
    bar.text = message();
  }

  update();
  bar.show();

  setInterval(update, 1000 * 60);

  const command = "c20210310.setHint";

  const commandHandler = async (name: string = "world") => {
    await showQuickInput();
    update();
  };

  subscriptions.push(vscode.commands.registerCommand(command, commandHandler));
}

async function showQuickInput() {
  const result = await vscode.window.showInputBox({
    placeHolder: "Set the whatever hint you like.",
  });
  return vscode.workspace.getConfiguration("c20210310").update("hint", result);
}

// this method is called when your extension is deactivated
export function deactivate() {}
