const accessTokenKey = "accessToken";
const refreshTokenKey = "refreshToken";

export const saveToken = (
  accessToken: string | null,
  refreshToken: string | null
) => {
  if (accessToken && refreshToken) {
    localStorage.setItem(accessTokenKey, accessToken);
    localStorage.setItem(refreshTokenKey, refreshToken);
  } else {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
  }
};

export const getToken = () => {
  const accessToken = localStorage.getItem(accessTokenKey);
  const refreshToken = localStorage.getItem(refreshTokenKey);

  return { accessToken, refreshToken };
};
