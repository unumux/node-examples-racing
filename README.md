# ES6 Scaffold for Node

This is a really simple scaffold to use ES6 on Node, with some additional features for Visual Studio Code. It is already setup to use debugging out of the box. It also features ESLint (recommend using the ESLint extension for VSCode). 

## Sharing

If you want to be able to push this code back to Github to share with others, please be sure to fork the repo BEFORE cloning. Then clone from your Github URL instead of the one below. 

## Installation

Use git to download the source code. With git clone, you can specify the folder to put the code in. For example:

#### To clone to the current folder (folder must be empty):
```bash
git clone https://github.com/unumux/es6-vscode-scaffold .
```

#### To clone to a specific folder:
```bash
git clone https://github.com/unumux/es6-vscode-scaffold ~/Documents/my-test-project
```

After doing that, you will need to run `npm install`. You can do this from a terminal, or get the "npm" extension for Visual Studio Code and just press CMD+SHIFT+P and run "npm: install saved packages"  

## Usage

To use the scaffold, open the folder inside Visual Studio Code. If you have the command line tools installed for Code, you can do this simply by running the following from the project folder inside terminal:

```bash
code .
```

All editable code should be put in the "app" folder. To run the project in Visual Studio Code, do one of the following:

- Activate the debug panel on the left, and click the green "play" symbol.
- Press `CMD+SHIFT+P` and type `debug start` and press enter on "Debug: Start debugging"
- Press F5 on your keyboard (you may need to press "FN" in addition to F5, depending on your settings)

For those who aren't using Visual Studio Code, to run from Terminal:

```baseh
node entry.js
```
