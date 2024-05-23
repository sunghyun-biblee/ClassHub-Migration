export function fetchUserStorage() {
  const userStore = localStorage.getItem("user");
  return userStore ? JSON.parse(userStore) : {};
}
