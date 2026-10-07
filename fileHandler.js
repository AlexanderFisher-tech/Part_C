const { readFile, appendFile } = require("fs/promises");

class FileHandler {
	static async appendUrlText(url) {
		const text = FileHandler.getUrlText(url);
		const formattedText = `${text}\n`

		try {
			await appendFile("./file.txt", formattedText, "utf-8");
			console.log("Text successfully written");
		} catch (err) {
			console.error("Something went wrong:", err);
		}
	}

	static async readText(textFileName) {
		try {
			return await readFile(`./${textFileName}`);
		} catch (err) {
			console.error("Something went wrong", err);
		}
	}

	static getUrlText(url) {
		const textFromUrl = url.searchParams.get("text");
		return textFromUrl;
	}
}

module.exports = FileHandler;
