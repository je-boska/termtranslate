#! /usr/bin/env node
const yargs = require("yargs");
const utils = require("./utils.js");
const translate = require('@vitalets/google-translate-api');
const colors = require("colors");

const usage = "\nUsage = translate <lang_name> sentence to be translated";

const options = yargs
	.usage(usage)
	.option("l", {alias: "languages", describe: "List all supported languages", type: "boolean", demandOption: false})
	.help(true)
	.argv;

if (yargs.argv.l == true || yargs.argv.languages == true) {
	utils.showAll();
	return;
}

if (yargs.argv._[0] == null) {
	utils.showHelp();
	return;
}

if (yargs.argv._[0]) 
var language = yargs.argv._[0].toLowerCase();
language = utils.parseLanguage(language);

if (language == null) return;

var sentence = utils.parseSentence(yargs.argv._);

if (sentence == "") {
	console.error("\nNo sentence entered!\n".red.bold);  
    	console.log("Enter translate --help to get started.\n");
    	return;
}

translate(sentence, {to: language})
	.then(res => {console.log(colors.yellow("\n" + res.text + "\n"));})
	.catch(err => {console.error(err);}
);
