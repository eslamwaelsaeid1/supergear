// بعمل فيه السيت اب الاساسي ل express
// استيراد كل ملف رووت ديناميكيًا وإضافته إلى السيرفر
// اعداد رووت الصفحة الرئيسية: عند الدخول إلى / يتم إرسال ملف الاندكس
// تشغيل السيرفر والاستماع على البورت المحدد

import express from "express";
const app = express();
import "dotenv/config";
import cors from "cors";
const port = process.env.PORT || 8000;

app.use(express.json());
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || /\.vercel\.app$/.test(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true
// }));
app.use(cors());
// app.use(cors({
//   origin: /\.vercel\.app$/, // السماح بأي نطاق من Vercel
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true
// }));

import { fileURLToPath } from "url";
import path from "path";
import { readdirSync } from "fs";

const __filename = fileURLToPath(import.meta.url); // بيجبلي مسار الملف بتاعي   //D:\do-it\admin\index.mjs
const __dirname = path.dirname(__filename); // (بيجيب مسار المجلد الحالي اللي فيه الملف (اللي الكود شغال منه  // D:\do-it\admin

const routesPath = path.resolve(__dirname, "./routes"); // بيجيب مسار فولد ال routes  //D:\do-it\admin\routes
const routeFiles = readdirSync(routesPath); // بيقرأ كل الملفات الموجودة في فولدر routes وبيحطهم في مصفوفة (array). //[ 'blogs.mjs', 'categories.mjs', 'highlights.mjs', 'products.mjs' ]
// console.log("🔹 Found route files:", routeFiles);

routeFiles.map(async (file) => {
  const routeModule = await import(`./routes/${file}`); // عشان اعمل تصدير لكل ملفات الرووت
  app.use("/", routeModule.default);
});
app.get("/", (req, res) => {
  //import   مخصص لاستيراد ملفات جافاسكريبت، مش ملفات HTML
  res.sendFile(path.join(__dirname, "public", "index.html")); //دالة تُستخدم لإرسال ملف من السيرفر إلى العميل // محتاجه  مسار الملف
  //=   res.sendFile(path.resolve(__dirname, "public", "index.html"));
  //=   res.sendFile(path.join(__dirname, "/public", "index.html"));
});
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
