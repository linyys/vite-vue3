import { post } from "@/axios/index"
import { Conn, Join } from "./type"

export const chat_conn = (data: Conn) => {
  return post("chat/chat_conn", data)
}

export const chat_join = (data: Join) => {
  return post("chat/join", data)
}
