import { Transport } from "@nestjs/microservices"

export const MicroServiceRegister : any = (microServiceName : string) => {
    return {
        name : microServiceName,
        transport : Transport.TCP,
        options : {
            host : 'localhost',
            port : 8081,
        }
    }
}
