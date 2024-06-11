const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isContactType = (type) => ['personal', 'home', 'other'].includes(type);

  if (isContactType(type)) return type;
};

const parseIsFav = (boolean) => {
  const isBoolFavourite = (boolean) => ['true', 'false'].includes(boolean);

  if (isBoolFavourite(boolean)) return boolean === 'true' ? 'true' : 'false';
};

export const parseFilterParams = (query) => {
  const { typeOfContact, favourite } = query;

  const parsedContactType = parseContactType(typeOfContact);
  const parsedBoolIsFav = parseIsFav(favourite);

  return {
    typeOfContact: parsedContactType,
    favourite: parsedBoolIsFav,
  };
};
