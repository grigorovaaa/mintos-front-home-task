import jwtd from 'jwt-decode'

const STORAGE_KEY_TOKEN = 'token'
const STORAGE_KEY_REFRESH_TOKEN = 'refresh_token'
const TOKEN_TTL_RUBICON = 30

// eslint-disable-next-line no-unused-vars
let intervalRefreshToken = null

// проверяем токен по TTL
function checkToken (context) {
  const token = context.state.token
  if (!token) {
    return
  }
  // проверим время жизни
  const now = Math.floor((new Date()).getTime() / 1000) // текущее время unix
  const ttl = (context.getters.tokenExp - now) - TOKEN_TTL_RUBICON

  if (ttl <= 0) { // токен издох
    context.commit('token', '')
    return
  }

  intervalRefreshToken = setTimeout(() => {
    refreshToken(context)
  }, TOKEN_TTL_RUBICON * 1000)
}

function refreshToken (context) {
  context.dispatch('Api/TOKEN_REFRESH', { params: { refresh_token: context.state.refresh_token } }, { root: true })
    .then(result => {
      const token = result.data.token || ''
      context.commit('token', token)
    })
    .catch(e => {
      console.error(e)
    })
    .finally(() => {
      checkToken(context)
    })
}

export default {
  state: {
    token: '',
    refresh_token: ''
  },
  getters: {
    /**
     * @return {string}
     */
    UID (state) {
      let uid = ''
      if (state.token) {
        uid = jwtd(state.token).username || ''
      }

      return uid
    },
    tokenExp (state) {
      let exp = 0
      if (state.token) {
        exp = jwtd(state.token).exp || 0
      }

      return exp
    }
  },
  mutations: {
    token (state, token) {
      state.token = token
      localStorage.setItem(STORAGE_KEY_TOKEN, token)
    },
    refresh_token (state, refreshToken) {
      state.refresh_token = refreshToken
      localStorage.setItem(STORAGE_KEY_REFRESH_TOKEN, refreshToken)
    }
  },
  actions: {
    init (context) {
      const token = localStorage.getItem(STORAGE_KEY_TOKEN) || ''
      context.commit('token', token)
      const refreshToken = localStorage.getItem(STORAGE_KEY_REFRESH_TOKEN) || ''
      context.commit('refresh_token', refreshToken)
      checkToken(context)
    }
  }
}
