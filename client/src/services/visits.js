import { api } from '../config'
import { visits } from '../test-data'

export default {
  getAll() {
    const url = '/visits'
    return api.get(url)
  },

  post(data) {
    const url = '/visits'
    return api.post(url, data)
  },

  postNoteById(visitId, data) {
    const url = `/visits/${visitId}/notes`
    return api.post(url, data)
  },
}
