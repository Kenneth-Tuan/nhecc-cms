export function responseErrorHandler(error) {
  if (error.response) {
    switch (error.response.status) {
      case 401:
      case 403:
      case 500:
      default:
        throw error;
    }
  }
  if (!window.navigator.onLine) {
  }

  return Promise.reject(error);
}
