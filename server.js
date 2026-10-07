const http = require("http");
const fs = require("fs");

const FileHandler = require("./fileHandler");

class Server {
	static startServer(PORT) {
		const server = http.createServer((req, res) => {
			res.setHeader("Content-Type", "text/plain");

			const parsedUrl = new URL(req.url, "http://localhost");
			Server.requestController(req, res, parsedUrl);
		});

		server.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
		});
	}

	static async requestController(req, res, url) {
		const pathname = url.pathname;

		if (pathname.includes("writeFile")) {
			await Server.handleAppendRequest(res, url);
		} else if (pathname.includes("readFile")) {
			await Server.handleReadRequest(res, url);
		} else {
			res.statusCode = 404;
			res.end("404 Not Found");
		}
	}

	static async handleAppendRequest(res, url) {
		await FileHandler.appendUrlText(url);
		res.statusCode = 200;
		res.end("Text written successfully");
	}

	static async handleReadRequest(res, url) {
		const pathSegments = url.pathname.split("/");
		const textFile = pathSegments.pop(); // Last segment is the text file

		let textFileExists = fs.existsSync(`${textFile}`);

		if (textFileExists) {
			const text = await FileHandler.readText(textFile);
			res.statusCode = 200;
			res.end(text);
		} else {
			res.statusCode = 404;
			res.end(`404: File ${textFile} not found`);
		}
	}
    
}

// Grab the platform's assigned port, or fall back to 8080 for local testing
const PORT = process.env.PORT || 8080;

Server.startServer(PORT);
