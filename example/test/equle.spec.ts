const root = process.cwd()

describe('Test', () => {
  test('root', () => {
    expect(process.cwd()).toBe(root)
  })
})
