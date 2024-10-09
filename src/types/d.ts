export type FormState = 
  | Response
  |   {
          errors?: {
          name?: string[]
          email?: string[]
          password?: string[]
          }
          message?: string
      }
  |   undefined

export interface DatabaseUserAttributes  {
  id: string,
  name: string
}

export interface DatabaseSessionAttributes  {
  id: string
}