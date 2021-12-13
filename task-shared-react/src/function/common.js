export const isValidRequiredInput = (...args) => {
  let validator = true;
  for(let i=0; i < args.length; i=(i+1)|0) {
    if (args[i] === '') {
      validator = false;
      return validator;
    }
  }
  return validator;
}

export const checkDateInterval = (startDate, endDate) => {
  let validator = true;
  const array1 = (startDate.toString()).split('-')
  const array2 = (endDate.toString()).split('-')
  console.log(array1)
  console.log(array2)

  if(Number(array1[0]) > Number(array2[0])){
    return false
  }
  if(Number(array1[1]) > Number(array2[1])){
    return false
  }
  if(Number(array1[2]) > Number(array2[2])){
    return false
  }

  return validator
}