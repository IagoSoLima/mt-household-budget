interface RemoveMask {
  value: any;
}

export const removeMask = (params: RemoveMask) => {
  return String(params.value).replace(/\D/g, '');
};
