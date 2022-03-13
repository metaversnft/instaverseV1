import { atom } from "recoil";

const loginUser = atom({
  key: "login_use",
  default: {
    username: "",
    name: "",
    image: "",
  },
});

export { loginUser };
