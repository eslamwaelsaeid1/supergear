interface Config {
  baseUrl: string;
}
const checkConfig = (server: string): Config | object => {
  let config: Config | object = {};
  switch (server) {
    case "production":
      config = {
        baseUrl: "https://supergear-opal.vercel.app/",
      };
      break;
    case "local":
      config = {
        baseUrl: "http://localhost:8000",
      };
      break;
    default:
      break;
  }
  return config;
};

export const selectServer = "production";
export const config = checkConfig(selectServer) as Config; //type assertion يعني أنك تقول لـ تايب اسكربت أنا متأكد أن الكائن الذي أرجعه سيكون من نوع (كونفج)، حتى لو كان الكائن فارغًا في البداية.

// const checkConfig = (server: string) => {
//   let config ;
//   switch (server) {
//     case "production":
//       config = {
//         baseUrl: "https://supergearyt.vercel.app/",
//       };
//       break;
//     case "local":
//       config = {
//         baseUrl: "http://localhost:8000",
//       };
//       break;
//   }
//   return config;
// };

// const selectServer = "local";
// export const config = checkConfig(selectServer);
