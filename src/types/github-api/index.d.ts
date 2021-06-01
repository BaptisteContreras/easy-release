declare module 'github-api'

interface GitHub {
  listPullRequests(filters : Object, callback : CallableFunction) : any
}
