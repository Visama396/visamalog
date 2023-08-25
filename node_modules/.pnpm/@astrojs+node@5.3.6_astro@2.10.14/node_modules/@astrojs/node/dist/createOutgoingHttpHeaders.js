const createOutgoingHttpHeaders = (webHeaders) => {
  if (!webHeaders) {
    return void 0;
  }
  const headers = webHeaders;
  const nodeHeaders = Object.fromEntries(headers.entries());
  if (Object.keys(nodeHeaders).length === 0) {
    return void 0;
  }
  if (headers.has("set-cookie")) {
    const cookieHeaders = headers.getSetCookie();
    if (cookieHeaders.length > 1) {
      nodeHeaders["set-cookie"] = cookieHeaders;
    }
  }
  return nodeHeaders;
};
export {
  createOutgoingHttpHeaders
};
