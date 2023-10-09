import path from "path";
const rootPath = require.main ? path.dirname(require.main.filename) : `/`;
export default rootPath;
