const root = process.cwd()

describe('test', () => {
  it('root', () => {
    expect(process.cwd()).toBe(root)
  })
})
