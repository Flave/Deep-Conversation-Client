export const capitalize = (str) => {
  return (str && str.length) && str[0].toUpperCase() + str.slice(1).toLowerCase()
}