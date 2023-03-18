import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Base path")
@Controller()
export class AppController {
	constructor() {}

	@Get()
	getHello(): string {
		return "Hello world!!! I am a task mamagement Rest API.";
	}
}
