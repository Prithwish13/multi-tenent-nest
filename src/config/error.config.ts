const errors = {
  validationFailed: (messages: string) => {
    return {
      statusCode: 400,
      message: [messages],
      error: 'Bad Request',
    };
  },
  unauthorized: (messages: string) => {
    return {
      statusCode: 401,
      message: [messages],
      error: 'Unauthorized',
    };
  },
  forbidden: (messages: string) => {
    return {
      statusCode: 403,
      message: [messages],
      error: 'Forbidden',
    };
  },
  notFound: (messages: string) => {
    return {
      statusCode: 404,
      message: [messages],
      error: 'Not Found',
    };
  },
  internalServerError: (messages: string) => {
    return {
      statusCode: 500,
      message: [messages],
      error: 'Internal Server Error',
    };
  },
};

export default errors;
