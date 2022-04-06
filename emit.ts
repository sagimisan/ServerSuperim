import { io } from "./ioSocket";

export default function emit(funcName:string,value:any){
    io.emit(funcName, value);
}