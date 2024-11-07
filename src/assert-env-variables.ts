type PossibleArrays = ReadonlyArray<string | ReadonlyArray<string>>

type EnvVariables<T extends PossibleArrays> = {
  [K in Flatten<T>]: ValueOf<T, K>
}

type CheckForOptional<T> = {
  [K in keyof T]: T[K] extends never ? string | undefined : string
} & unknown

type Flatten<T> = T extends ReadonlyArray<infer U> ? (U extends string ? U : Flatten<U>) : T

type ValueOf<T, K> = T extends ReadonlyArray<infer U>
  ? U extends K
    ? K extends string
      ? string
      : string | undefined
    : never
  : never

export function assertEnvVariables<T extends PossibleArrays>(keys: T): CheckForOptional<EnvVariables<T>> {
  const variables: Partial<CheckForOptional<EnvVariables<T>>> = {}
  const errors: string[] = []

  keys.forEach((key) => {
    if (Array.isArray(key)) {
      const values = key.map((k) => process.env[k])
      if (values.every((value) => !value)) {
        errors.push(`Missing environment variables '${key.join(' or ')}'`)
        return
      }
      key.forEach((subKey, index) => {
        variables[subKey as Flatten<T>] = values[index]
      })
    } else if (typeof key === 'string') {
      const value = process.env[key]
      if (!value) {
        errors.push(`Missing environment variable '${key}'`)
        return
      }
      variables[key as Flatten<T>] = value
    }
  })

  if (errors.length) {
    throw new Error(errors.join(', '))
  }

  return variables as EnvVariables<T>
}