import file from "../models/file.js";

export const homepage = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  const userId = req.session.userId;
  const files = await file
    .find({ permittedUsers: { $elemMatch: { userId } } })
    .lean();

  return res.render("home/index", {
    files: files,
    total: files.length,
  });
};

