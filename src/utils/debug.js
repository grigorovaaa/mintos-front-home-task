export default function (msg, data) {
  if (process.env.NODE_ENV === 'development') {
    console.debug(msg, data)
  }
}
