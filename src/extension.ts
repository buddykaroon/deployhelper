// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { Console, debug } from 'console';
import { setDefaultResultOrder } from 'dns';
import * as vscode from 'vscode';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let sfdxCredentials : string;
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "deployhelper" is now active!');
	

	let terminal = vscode.window.createTerminal();
	terminal.sendText('sfdx auth:list --json  > .\\test.txt');
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	
	context.subscriptions.push(
		vscode.commands.registerCommand('deployhelper.openWindow', () => {

			if(vscode.workspace.workspaceFolders !== undefined) {
				let f = vscode.workspace.workspaceFolders[0].uri.fsPath; 
				vscode.workspace.openTextDocument(f+'\\test.txt').then((document) => {
					sfdxCredentials = document.getText();
					console.log('test');
					

					const panel = vscode.window.createWebviewPanel(
						'deployhelper', // Identifies the type of the webview. Used internally
						'Deploy Helper', // Title of the panel displayed to the user
						vscode.ViewColumn.One, // Editor column to show the new webview panel in.
						{
							// Enable scripts in the webview
							enableScripts: true
						  }
					  );
					  const updateWebview = () => { 
						let arrSize = Object.keys(credentialsObj.result).length;
						let str = '';
						for (let i = 0; i < arrSize; i ++)
						{
							str += '\n<option value="saab">' + credentialsObj.result[i].alias + '</option>\t';
						} 
						panel.webview.html = getWebviewContent(str);

					  };
				
					  // Set initial content
				
					  // And schedule updates to the content every second
					  setTimeout(updateWebview, 3000); 
					  let credentialsObj = JSON.parse(sfdxCredentials);

				  });
			} 
			else {
				let message = "Working folder not found, open a folder an try again" ;
				vscode.window.showErrorMessage(message);
			}
			
			//open sfdev auth and parse..
			//Expected output: 
		  // Create and show a new webview
		})
	  ); 
	  function getWebviewContent(orglist : string) {
		return `<!DOCTYPE html>
	  <html lang="en">
	  <head>
		  <meta charset="UTF-8">
		  <meta name="viewport" content="width=device-width, initial-scale=1.0">
		  <title>Deploy Helper</title>
	  </head>
	  <body>
		  <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
		  Deploy Helper Tool:
		  <form action="/action_page.php">
	  <label for="fname">First name:</label>
	  <input type="text" id="fname" name="fname"><br><br>
	  <label for="lname">Last name:</label>
	  <input type="text" id="lname" name="lname"><br><br>

	  <h1>Source Org</h1>
		<select name="Source" id="Source">
			${orglist}
		</select>
		<br>
		<h1>Target Org</h1>
		<select name="Source" id="Source">
			${orglist}
		</select>
	  <input type="submit" value="Submit">
	</form>
	  </body>
	  </html>`;
	  }
}

// This method is called when your extension is deactivated
export function deactivate() {}



  