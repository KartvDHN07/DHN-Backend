import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class AppService {
  constructor(
    @Inject("SharedService") private readonly sharedService: ClientProxy
  ) {}

  async getHello(){
    return this.sharedService.send({cmd : 'root'}, 'getHello');
  }
}