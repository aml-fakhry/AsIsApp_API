/**
 * Returns a succeeded response with 200 status code.
 * @param response The http-response to be modified.
 * @param body An optional body that will be sent within the response' body.
 */
export function OK(res, body) {
  return body ? res.status(200).send(body) : res.status(200).send();
}

/**
 * Returns a bad request with 400 status code.
 * @param response The http-response to be modified.
 * @param body An optional body that will be sent within the response' body.
 */
export function BadRequest(res, body) {
  return body ? res.status(400).send(body) : res.status(400).send();
}

/**
 * Returns a not-found response with 404 status code.
 * @param response The http-response to be modified.
 * @param body An optional body that will be sent within the response' body.
 */
export function NotFound(res, body) {
  return body ? res.status(404).send(body) : res.status(404).send();
}

/**
 * Returns a unauthenticated user with 401 status code.
 * @param response The http-response to be modified.
 */
export function unAuthenticated(res) {
  const body = {
    code: '',
    title: 'User is not authenticated',
    detail: 'No valid access token provided',
  };
  return res.status(401).send(body);
}

/**
 * Returns a forbidden user with 403 status code.
 * @param response The http-response to be modified.
 */
export function Forbidden(res) {
  const body = {
    code: '',
    title: 'User is not authenticated',
    detail: 'No valid access token provided',
  };
  return res.status(403).send(body);
}
