import User from "../models/user.js";
import File from "./../models/file.js";

export const uploadFile = async (req, res) => {
  const { file } = req;
  const { userId } = req.session;

  const newFile = new File({
    name: file.originalname,
    path: file.filename,
    size: file.size,
    type: file.mimetype,
    permittedUsers: [
      {
        userId,
        isOwner: true,
      },
    ],
  });

  await newFile.save();

  return res.redirect("/");
};

export const permitFile = async (req, res) => {
  const { fileId, emails } = req.body;
  const file = await File.findById(fileId);
  if (!file) {
    return res.redirect("/");
  }

  const permittedUsers = emails
    .split(",")
    .filter(Boolean)
    .map((email) => email.trim());

  const userIds = [];

  const permittedUsersIds = await User.find({ email: { $in: permittedUsers } });
  for (let index = 0; index < permittedUsers.length; index++) {
    const currentUserEmail = permittedUsers[index];
    const currentUser = permittedUsersIds.find(
      (user) => user.email === currentUserEmail
    );
    if (!currentUser) {
      const newUser = new User({
        firstName: "Guest",
        lastName: "User",
        email: currentUserEmail,
        password: "",
      });

      await newUser.save();
      userIds.push({ userId: newUser._id, isOwner: false });
    } else {
      if (
        file.permittedUsers.findIndex(
          (permitted) =>
            permitted.userId.toString() === currentUser._id.toString()
        ) === -1
      ) {
        userIds.push({ userId: currentUser._id, isOwner: false });
      }
    }
  }
  file.permittedUsers.push(...userIds);

  await file.save();

  return res.redirect("/");
};
