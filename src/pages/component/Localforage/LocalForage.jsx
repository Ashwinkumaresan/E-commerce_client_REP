import localforage from "localforage";

// Create a localForage instance (optional but recommended)
const authStore = localforage.createInstance({
  name: "authStorage",
});

// Save accessToken
export const saveAccessToken = async (token) => {
  try {
    await authStore.setItem("accessToken", token);
    console.log("Access token saved");
  } catch (err) {
    console.error("Error saving token", err);
  }
};

// Get accessToken
export const getAccessToken = async () => {
  try {
    const token = await authStore.getItem("accessToken");
    return token;
  } catch (err) {
    console.error("Error getting token", err);
    return null;
  }
};

// Remove accessToken
export const removeAccessToken = async () => {
  try {
    await authStore.removeItem("accessToken");
    console.log("Access token removed");
  } catch (err) {
    console.error("Error removing token", err);
  }
};