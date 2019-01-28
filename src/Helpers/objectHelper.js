export const updateObject = (oldObj, updatedProps) => ({
  ...oldObj,
  ...updatedProps,
});

export const updateArray = (oldObj, filterData, text) => ({
  ...oldObj,
  toDo: {
    ...oldObj.toDo,
    [text]: {
      text: filterData[text].text,
      state: filterData[text].state,
    }}
});

export const updateStateOfTheArray = (oldObj, filterData, key) => ({
  ...oldObj,
  toDo: {
    ...oldObj.toDo,
    [key]: {
      ...oldObj.toDo[key],
      state: filterData[key].state
    }
  }
});

export const deleteObject = (oldObj, filterData, key) => ({
  ...oldObj,
  toDo: {
    ...oldObj.toDo,
    [key]: [...oldObj.toDo]
      .filter((x, index) => index !== key)
  },
});

