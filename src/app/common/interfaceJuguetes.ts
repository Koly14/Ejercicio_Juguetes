export interface ApiJuguetes {
  juguetes: Juguetes
}
export interface Juguetes {
  info:Info
  juguetes: Juguete[]
}
export interface Info {
  total: number
  pages: number
}
export interface Juguete {
  _id: string,
  nombre: string
  imagen: string
  categoria: string
  edadMinima: number
  precio: number
}

// :ID - mensaje que devuelve (ADD Y DELETE)
export interface StatusMessage {
  message: string
}

// UPDATE devuelve mensaje y Data
export interface UpdateStatusMessage {
  message: string
}
