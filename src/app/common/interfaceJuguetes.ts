export interface ApiJuguetes {
  juguetes: Juguete[]
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
