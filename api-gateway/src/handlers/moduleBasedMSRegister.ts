import { Transport } from "@nestjs/microservices"

export const MicroServiceRegister : any = (microServiceName : string) => {
    return {
        name : microServiceName,
        transport : Transport.REDIS
    }
}