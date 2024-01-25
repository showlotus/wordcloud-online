import parse from './parse'

class TokensCache {
  public tokens: any[]
  constructor() {
    this.tokens = []
  }

  updateCache(data: string) {
    this.tokens = parse(data, [])
    // return
  }
}

export const tokensCache = new TokensCache()
