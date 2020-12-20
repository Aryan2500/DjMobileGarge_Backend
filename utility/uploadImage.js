const path = require("path");

//uploads image
exports.UploadImage = (req, res ,Dirpath) => {
  if (req.files != undefined) {
    file = req.files.image;
    console.log(file);
    var time = Date.now();

    var extname = path.extname(file.name);
    var newbasename = path.basename(file.name, extname) + time;
    var newName = (newbasename + extname).toLowerCase();

    var extList = [".jpg", ".JPG", ".png", ".PNG"];
    if (!extList.includes(extname)) {
      return res.json({ error: "Only Jpg or Png file allowed" });
    }
    if (file.size > 200000) {
      return res.json({ error: "file should be less than 200KB" });
    }
    file.mv(Dirpath + newName);
    res.locals.imageName = newName
    res.json({ filename: newName });
  }else {
    res.status(400).json({ error: "No file provided" });
  }
};
