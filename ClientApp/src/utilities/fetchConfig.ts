const getConfigs = <ParamType>(
  method: string,
  params?: ParamType
): RequestInit | undefined => {
  switch (method) {
    case "POST":
      return {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Accept-Encoding": "gzip, deflate, br",
          "Connection": "keep-alive",
          "Content-Length": "1000000"
        },
        body: JSON.stringify(params),
      };
    case "GET":
      return {
        method: "GET",
        mode: "cors",
        body: JSON.stringify(params),
      };
    default:
      return undefined;
  }
};

export const fetchConfig = async <ParamType, ReturnType extends {} = never>(
  url: string,
  method: string,
  params?: ParamType
) => {
  const response = await fetch(url, getConfigs(method, params));

  type JSONResponse = {
    data?: ReturnType
    errors?: Array<{ message: string }>;
  };

  const { data, errors }: JSONResponse = await response.json();

  if (response.ok) {
    if (data) {
      return data;
    } else {
      return Promise.reject(new Error("Error: Rejected from fetch"));
    }
  } else {
    const error = new Error(
      errors?.map((e) => e.message).join("\n") ?? "unknown"
    );
    return Promise.reject(error);
  }
};
