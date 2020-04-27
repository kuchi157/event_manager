dbPassword =
  "mongodb+srv://eventmanager:" +
  encodeURIComponent("kuchi157") +
  "@CLUSTER_NAME_HERE.mongodb.net/test?retryWrites=true";

module.exports = {
  mongoURI: dbPassword,
};
