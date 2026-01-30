import users from "./users.json";

const fetch = (url: string) => {
  return new Promise((resolve, reject) => {
    if (url === "/api/users") {
      resolve(users);
    } else {
      reject({ status: 404, message: "Not Found" });
    }
  });
};

export default fetch;
