import axios from "axios";

const port = process.env.PORT || 4000;
const axiosInstance = axios.create({
  baseURL: `http://localhost:${port}/graphql`
});
export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance;
};
export { axiosInstance };
