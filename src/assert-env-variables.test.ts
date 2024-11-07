import { assertEnvVariables } from './assert-env-variables'

describe('assertEnvVariables', () => {
  it('should return the environment variables', () => {
    const requiredVars = [
      'BASE_URL',
      'API_URL',
      'AUTH_URL',
      'PROJECT_KEY',
      ['API_TOKEN', 'API_TOKEN_SECRET_NAME'],
    ] as const
    
    const envVars = assertEnvVariables(requiredVars)
    
    expect(envVars).toEqual({
      BASE_URL: 'https://www.example.com',
      API_URL: 'https://api.example.com',
      AUTH_URL: 'https://auth.example.com',
      PROJECT_KEY: 'project-key',
      API_TOKEN: 'api-token',
      API_TOKEN_SECRET_NAME: undefined
    })
  })

  it('should throw an error if an required environment variable is missing', () => {
    const requiredVars = [
      'BASE_URL',
      'API_URL',
      'AUTH_URL',
      'PROJECT',
    ] as const

    expect(() => assertEnvVariables(requiredVars)).toThrow('Missing environment variable \'PROJECT\'')
  })

  it('should throw an error if all the set of required environment variables are missing', () => {
    const requiredVars = [
      'BASE_URL',
      'API_URL',
      'AUTH_URL',
      ['PROJECT', 'PROJECT_KEY_NAME'],
    ] as const

    expect(() => assertEnvVariables(requiredVars)).toThrow('Missing environment variables \'PROJECT or PROJECT_KEY_NAME\'')
  })
})