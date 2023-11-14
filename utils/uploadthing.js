const { createUploadthing } = require("uploadthing/express");

const f = createUploadthing();

exports.uploadRouter = {
  courseImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(() => {}),
  courseAttachment: f([
    "text",
    "image",
    "video",
    "audio",
    "pdf",
  ]).onUploadComplete(() => {}),
  chapterVideo: f({
    video: { maxFileCount: 1, maxFileSize: "512GB" },
  }).onUploadComplete(() => {}),
};
