import axios from 'axios'
import debug from '@/utils/debug'

const URL_BACKEND = process.env.VUE_APP_URL_BACKEND

function callPost (url, data, context) {
  debug('call API post', { url, data })
  return new Promise((resolve, reject) => {
    let err = ''
    axios.post(
      url,
      data,
      {
        // headers: {
        //   Authorization: 'Bearer ' + context.rootState.Auth.token
        // }
      })
      .then(({ data, status }) => {
        if (status === 200 || status === 201) {
          resolve({ data, status })
        }
      })
      .catch(e => {
        if (e.response.status === 409) {
          resolve(e.response.status)
        } else {
          err = e.toString()
          console.error(e)
          reject(err)
        }
      })
  })
}

function callHead (url, context) {
  debug('call API head', { url })
  return new Promise((resolve, reject) => {
    let err = ''
    axios.head(
      url,
      {
        // headers: {
        //   Authorization: 'Bearer ' + context.rootState.Auth.token
        // }
      })
      .then(({ data, status }) => {
        if (status === 204) {
          resolve(status)
        } else {
          err = 'status not 204'
          console.error(err)
          reject(err)
        }
      })
      .catch(e => {
        if (e.response.status === 404) {
          resolve(e.response.status)
        } else {
          err = e.toString()
          console.error(e)
          reject(err)
        }
      })
  })
}

function callGet (url, context) {
  debug('call API get', { url })
  return new Promise((resolve, reject) => {
    let err = ''
    axios.get(
      url,
      {
        headers: {
          Authorization: 'Bearer ' + context.rootState.Auth.token
        }
      })
      .then(({ data, status }) => {
        if (status === 200) {
          resolve({ data, status })
        } else {
          err = 'status not 200'
          console.error(err)
          reject(err)
        }
      })
      .catch(e => {
        err = e.toString()
        console.error(e)
        reject(err)
      })
  })
}

export default {
  getters: {
  },
  actions: {
    LOGIN (context, payload) {
      return new Promise((resolve, reject) => {
        const data = payload.params || []
        const url = URL_BACKEND + 'login_check'
        callPost(url, data, context)
          .then(result => {
            debug('call API result', { result, data, url: url })
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    REGISTRATION (context, payload) {
      return new Promise((resolve, reject) => {
        const data = payload.params || []
        const url = URL_BACKEND + 'registration'
        callPost(url, data, context)
          .then(result => {
            let isCreated
            if (result.status === 201) {
              isCreated = true
            } else if (result.status === 409) {
              isCreated = false
            }
            debug('call API result', { status, data, url: url })
            resolve(isCreated)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    REGISTRATION_CHECK (context, payload) {
      return new Promise((resolve, reject) => {
        const data = payload.params || []

        const url = URL_BACKEND + 'registration?email=' + payload.params.email
        callHead(url, context)
          .then(status => {
            let isFree
            if (status === 204) {
              isFree = false
            } else if (status === 404) {
              isFree = true
            }
            debug('call API status', { status, data, url: url })
            resolve(isFree)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    TOKEN_REFRESH (context, payload) {
      return new Promise((resolve, reject) => {
        const data = payload.params || []
        const url = URL_BACKEND + 'token/refresh'
        callPost(url, data, context)
          .then(result => {
            debug('call API result', { result, data, url: URL_BACKEND })
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    FEED (context) {
      return new Promise((resolve, reject) => {
        callGet(URL_BACKEND + 'rss/feed', context)
          .then(result => {
            debug('call API result', { result, url: URL_BACKEND })
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    KEYWORDS (context) {
      return new Promise((resolve, reject) => {
        callGet(URL_BACKEND + 'rss/keywords', context)
          .then(result => {
            debug('call API result', { result, url: URL_BACKEND })
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
  }
}
