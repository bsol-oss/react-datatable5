export const idListSanityCheck = (
    param: string,
    idList: string[],
    properties: object
  ) => {
    const allKeyExists = idList.every((key) =>
      Object.keys(properties as object).some((column) => column == key)
    );
  
    if (!allKeyExists) {
      const wrongKey = idList.find(
        (key) =>
          !Object.keys(properties as object).some((column) => column == key)
      );
      throw new Error(
        `The key ${wrongKey} in ${param} does not exist in schema.`
      );
    }
  };