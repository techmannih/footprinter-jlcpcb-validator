import {
  createInvalidJsonResponse,
  createMethodNotAllowedResponse,
  handleCompareRequest,
} from '../dist-server/compareApi.js'

const jsonHeaders = {
  'content-type': 'application/json; charset=utf-8',
}

const createJsonResponse = (
  body,
  status,
  extraHeaders = {},
) =>
  new Response(JSON.stringify(body), {
    headers: {
      ...jsonHeaders,
      ...extraHeaders,
    },
    status,
  })

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      const result = createMethodNotAllowedResponse()
      return createJsonResponse(result.body, result.status, {
        allow: 'POST',
      })
    }

    let requestBody

    try {
      requestBody = await request.json()
    } catch {
      const result = createInvalidJsonResponse()
      return createJsonResponse(result.body, result.status)
    }

    const result = await handleCompareRequest(requestBody)
    return createJsonResponse(result.body, result.status)
  },
}
